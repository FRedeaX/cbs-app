import { QueryFunctionContext } from "@tanstack/react-query";

import { ISearchResponse } from "../../../lib/elastic";

export const fetchSuggestData = async ({
  queryKey,
}: QueryFunctionContext): Promise<ISearchResponse> => {
  const query = queryKey[1];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ES_URL}?query=${query}`,
  );
  if (!response.ok) {
    throw new Error("Network response error");
  }
  return response.json();
};
