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

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const getPostsByCategory = async (
  { slug, page }: GetPostsByCategory,
  metadata = false,
) => {
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

  const posts = await fetchPosts(variables, metadata);
  if (posts === null) return null;

  const { nodes: data, pageInfo } = posts;
  if (metadata) return { data };

  if (!page) {
    paginationList = await fetchPaginations({
      slug,
      endCursor: pageInfo.endCursor,
    });
  }

  return { data, pageCount: getLastPageNumber(paginationList) };
};
