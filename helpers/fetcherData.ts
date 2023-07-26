import { ApiError } from "next/dist/server/api-utils";

import { ERROR_MESSAGE } from "@/constants";

import { createQueryLink } from "./createQueryLink";

export type FetcherData = {
  url: string | undefined;
};
type Params = Parameters<typeof createQueryLink>[1];

export const fetcherData = async <TData, TParams extends Params>({
  url,
  ...params
}: FetcherData & TParams): Promise<TData> => {
  if (url === undefined) {
    throw new ApiError(400, `"id" ${ERROR_MESSAGE.URL_IS_UNDEFINED}`);
  }

  const response = await fetch(createQueryLink(url, params));
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }
  return response.json();
};
