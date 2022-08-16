import { exceptionLog } from "../../../helpers";
import { initialPagination } from "../pagination.const";
import { pageInfo } from "./type";

export const getLastPageNumber = (
  pagesInfo: pageInfo[],
): pageInfo["number"] => {
  const page = pagesInfo?.at(-1);

  if (page === undefined) {
    exceptionLog("last page of undefined");
    return initialPagination.number;
  }

  return page.number - 1;
};
