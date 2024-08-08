import { getLastPageNumber } from "@/core/pagination";
import { ERROR_MESSAGE } from "@/constants";

import { getPageNumberFromPath } from "../utils/getPageNumberFromPath";
import { isNotValidPageNumber } from "../utils/isNotValidPageNumber";
import { SSRError } from "../utils/ssrEror";

import { FetchPage, fetchPage } from "./utils/fetchPage";
import { fetchPaginations } from "./utils/fetchPaginations";

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const getPage = async (pathname: string[], metadata = false) => {
  if (pathname.length === 0) {
    throw new SSRError(ERROR_MESSAGE.URL_IS_UNDEFINED, { pathname });
  }

  const pageNumber = getPageNumberFromPath(pathname);
  if (pageNumber && isNotValidPageNumber(pageNumber)) return null;

  const uri = `/${
    pageNumber ? pathname.slice(0, -2).join("/") : pathname.join("/")
  }`;

  let paginationList: Awaited<ReturnType<typeof fetchPaginations>> = [];
  let variables: FetchPage = {
    uri,
  };

  if (pageNumber) {
    paginationList = await fetchPaginations({ uri });
    if (isNotValidPageNumber(pageNumber, paginationList.length)) return null;

    const currentPage = paginationList[pageNumber - 1];
    if (currentPage === undefined) {
      throw new SSRError(ERROR_MESSAGE.DATA_OF_NULL, { pathname });
    }
    const { cursor } = currentPage;

    variables = {
      uri,
      first: cursor === "" ? 10 : 20,
      cursor,
    };
  }

  const page = await fetchPage(variables, metadata);
  if (page === null) return null;

  const { children, ...data } = page;
  if (metadata) return { data, children, pageNumber };

  if (!pageNumber) {
    paginationList = await fetchPaginations({
      uri,
      endCursor: children?.pageInfo.endCursor,
    });
  }

  const count = getLastPageNumber(paginationList);
  const pagination = count > 1 ? { count, uri } : null;

  return { data, children, pagination, pageNumber };
};
