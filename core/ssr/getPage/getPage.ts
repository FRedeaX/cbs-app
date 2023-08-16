import { getLastPageNumber } from "@/core/pagination";
import { ERROR_MESSAGE } from "@/constants";

import { getPageNumberFromPath } from "../utils/getPageNumberFromPath";

import { FetchPage, fetchPage } from "./utils/fetchPage";
import { fetchPaginations } from "./utils/fetchPaginations";

export const getPage = async (pathname: string[]) => {
  const pageNumber = getPageNumberFromPath(pathname);
  const uri = pageNumber ? pathname.slice(0, -2).join("/") : pathname.join("/");

  let paginationList: Awaited<ReturnType<typeof fetchPaginations>> = [];
  let variables: FetchPage = {
    uri,
  };

  if (pageNumber) {
    paginationList = await fetchPaginations({ uri });
    const currentPage = paginationList[pageNumber - 1];
    if (currentPage === undefined) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);
    const { cursor } = currentPage;

    variables = {
      uri,
      first: cursor === "" ? 10 : 20,
      cursor,
    };
  }

  const { page, children } = await fetchPage(variables);

  if (!pageNumber) {
    paginationList = await fetchPaginations({
      uri,
      endCursor: children?.pageInfo.endCursor,
    });
  }

  const count = getLastPageNumber(paginationList);
  const pagination = count > 1 ? { count, uri } : null;

  return { data: page, children, pagination, pageNumber };
};
