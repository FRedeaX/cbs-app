import { QueryFunctionContext } from "@tanstack/react-query";

import { ISearchResponse } from "../../../lib/elastic/type";
import { ISearchParams } from "./type";

// const mergeFacet = (filters) => {
//   const f = [];
//   const url = new URL();
// };

type Query = [string, string][];
export const fetchSearchData = async ({
  queryKey,
}: QueryFunctionContext): Promise<ISearchResponse> => {
  if (!process.env.NEXT_PUBLIC_API_ES_URL)
    throw new Error("The search API undefined");

  const query: Query = Object.entries(queryKey[1] as ISearchParams);

  const url = new URL(process.env.NEXT_PUBLIC_API_ES_URL);
  query.forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response error");
  }
  return response.json();
};
