import { getLastPageNumber } from "@/core/pagination";
import { ERROR_MESSAGE } from "@/constants";

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
    const currentPage = paginationList[page - 1];
    if (currentPage === undefined) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);
    const { cursor } = currentPage;

    variables = {
      slug,
      first: cursor === "" ? 10 : 20,
      cursor,
    };
  }

  const { data, pageInfo } = await fetchPosts(variables);

  if (!page) {
    paginationList = await fetchPaginations({
      slug,
      endCursor: pageInfo?.endCursor,
    });
  }

  return { data, pageCount: getLastPageNumber(paginationList) };
};
