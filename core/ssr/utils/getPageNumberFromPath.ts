import { ERROR_MESSAGE } from "@/constants";

/**
 * Возвращаем номер страницы,
 * если сегмент `page` присутствует и
 * предпоследний в массиве иначе возвращаем `null`
 * или возвращаем ошибку если за `page` не следует число.
 *
 * @example
 * ['a', 'b', 'c'] - null
 * ['a', 'b', 'c', 'page'] - error
 * ['a', 'b', 'c', 'page', '2'] - 2
 */
export const getPageNumberFromPath = (path: string[]) => {
  const isNotPage = path.at(-2) !== "page";
  if (isNotPage) {
    return null;
  }

  const pageNumber = parseInt(path.at(-1) ?? "", 10);
  if (Number.isNaN(pageNumber)) {
    throw new Error(`pageNumber ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
  }

  return pageNumber;
};
