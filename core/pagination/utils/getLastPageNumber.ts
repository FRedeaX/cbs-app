import { initialPagination } from "../constant";

type Pagination = typeof initialPagination;

export const getLastPageNumber = (
  pagesInfo: Pagination[],
): Pagination["number"] => (pagesInfo.at(-1) as Pagination).number - 1;
