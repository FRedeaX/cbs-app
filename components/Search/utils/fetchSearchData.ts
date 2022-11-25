import { SearchResponseFrontend } from "../../../core/elastic/type";
import { SearchParams } from "./type";

interface IFetchSearchData extends SearchParams {
  apiUrl: string;
}

export const fetchSearchData = async ({
  apiUrl,
  ...queryKey
}: IFetchSearchData): Promise<SearchResponseFrontend> => {
  console.log("fetch");

  const query = Object.entries(queryKey);

  const url = new URL(apiUrl);
  query.forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response error");
  }
  return response.json();
};
