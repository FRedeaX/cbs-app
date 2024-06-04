import { getLastPageNumber } from "@/core/pagination";
import { ERROR_MESSAGE } from "@/constants";

import { isNotValidPageNumber } from "../utils/isNotValidPageNumber";
import { SSRError } from "../utils/ssrEror";

import { fetchPaginations } from "./utils/fetchPaginations";
import { FetchPosts, fetchPosts } from "./utils/fetchPosts";

type GetPostsByCategory = Pick<FetchPosts, "slug"> & {
  /**
   * Номер страницы для загрузки.
   */
  page?: number;
};

export const getPostsByCategory = async ({
  slug,
  page,
}: GetPostsByCategory) => {
  let paginationList: Awaited<ReturnType<typeof fetchPaginations>> = [];
  let variables: FetchPosts = {
    slug,
    first: 10,
    cursor: "",
  };

  if (page) {
    paginationList = await fetchPaginations({ slug });
    if (isNotValidPageNumber(page, paginationList.length)) return null;

    const currentPage = paginationList[page - 1];
    if (currentPage === undefined) {
      throw new SSRError(ERROR_MESSAGE.DATA_OF_NULL, { slug, page });
    }
    const { cursor } = currentPage;

    variables = {
      slug,
      first: cursor === "" ? 10 : 20,
      cursor,
    };
  }

  const posts = await fetchPosts(variables);

  if (posts === null) return null;
  const { data, pageInfo } = posts;

  if (!page) {
    paginationList = await fetchPaginations({
      slug,
      endCursor: pageInfo.endCursor,
    });
  }

  return { data, pageCount: getLastPageNumber(paginationList) };
};
