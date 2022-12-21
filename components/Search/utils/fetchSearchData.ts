import { Maybe } from "../../../helpers/typings/utility-types";

export type FetchSearchData = {
  apiUrl: Maybe<string>;
};

export const fetchSearchData = async <Data = unknown>({
  apiUrl,
  ...queryKey
}: FetchSearchData & { [key: string]: Maybe<string> }): Promise<Data> => {
  if (apiUrl === undefined) throw new Error("ApiUrl of undefined");

  const query = Object.entries(queryKey);

  const url = new URL(apiUrl);
  query.forEach(([key, value]) => {
    if (typeof value === "string") url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response error");

  return response.json();
};
