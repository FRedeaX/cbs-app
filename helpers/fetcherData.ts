import { ApiError } from "next/dist/server/api-utils";

import { ERROR_MESSAGE } from "@/constants";

import { createQueryLink } from "./createQueryLink";

export type FetcherData = {
  url: string | undefined;
};

type RequestInit = NonNullable<Parameters<typeof fetch>["1"]>;
type FetchInit = Pick<RequestInit, "body" | "headers" | "method">;

type Params = Parameters<typeof createQueryLink>[1];

export const fetcherData = async <TData, TParams extends Params>({
  url,
  body,
  method,
  headers,
  ...params
}: FetcherData & FetchInit & TParams): Promise<TData> => {
  if (url === undefined) {
    throw new ApiError(400, ERROR_MESSAGE.URL_IS_UNDEFINED);
  }

  const init: RequestInit = {};
  if (body) init.body = body;
  if (headers) init.headers = headers;
  if (method) init.method = method;

  const response = await fetch(createQueryLink(url, params), init);
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }
  return response.json();
};
