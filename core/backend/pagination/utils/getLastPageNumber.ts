import { exceptionLog } from "../../../../helpers";
import { Pagination, initialPagination } from "../constant";

export const getLastPageNumber = (
  pagesInfo: Pagination[],
): Pagination["number"] => {
  const page = pagesInfo?.at(-1);

  if (page === undefined) {
    exceptionLog("last page of undefined");
    return initialPagination.number;
  }

  return page.number - 1;
};
