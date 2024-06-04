import { getLastPageNumber } from "@/core/pagination";
import { ERROR_MESSAGE } from "@/constants";

import { isNotValidPageNumber } from "../utils/isNotValidPageNumber";
import { SSRError } from "../utils/ssrEror";

import { fetchPaginations } from "./utils/fetchPaginations";
import { FetchPosts, fetchPosts } from "./utils/fetchPosts";

type GetPosts = {
  /**
   * Номер страницы для загрузки.
   */
  page?: number;
};

export const getPosts = async ({ page }: GetPosts = {}) => {
  let paginationList: Awaited<ReturnType<typeof fetchPaginations>> = [];
  let variables: FetchPosts = {
    first: 10,
    cursor: "",
  };

  if (page) {
    paginationList = await fetchPaginations();
    if (isNotValidPageNumber(page, paginationList.length)) return null;

    const currentPage = paginationList[page - 1];
    if (currentPage === undefined) {
      throw new SSRError(ERROR_MESSAGE.DATA_OF_NULL, { page });
    }
    const { cursor, tags } = currentPage;

    variables = {
      first: cursor === "" ? 10 : 20,
      cursor,
      tagNotIn: tags,
    };
  }

  const { data, pageInfo } = await fetchPosts(variables);

  if (!page) {
    paginationList = await fetchPaginations({ endCursor: pageInfo.endCursor });
  }

  return { data, pageCount: getLastPageNumber(paginationList) };
};
