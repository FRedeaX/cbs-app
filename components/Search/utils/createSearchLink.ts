import { SearchParams } from "../../../core/elastic/type";

/**
 * Создает ссылку к `api` поиска.
 */
export const createSearchLink = (searchParams: SearchParams, pathname = "") => {
  if (process.env.NEXT_PUBLIC_API_ES_URL === undefined) {
    throw new Error("ApiUrl of undefined");
  }

  const query = Object.entries(searchParams);
  const url = new URL(pathname, process.env.NEXT_PUBLIC_API_ES_URL);

  query.forEach(([key, value]) => {
    if (typeof value === "string") url.searchParams.append(key, value);
  });

  return url;
};
