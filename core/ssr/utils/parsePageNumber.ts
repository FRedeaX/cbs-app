import { ERROR_MESSAGE } from "@/constants";

export const parsePageNumber = (pageNumber: string) => {
  const page = parseInt(pageNumber, 10);
  if (Number.isNaN(page)) {
    throw new Error(`pageNumber ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
  }
  return page;
};
