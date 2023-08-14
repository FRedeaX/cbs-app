import { DocumentNode } from "graphql";
import { request } from "graphql-request";
import {
  GraphQLClientRequestHeaders,
  Variables,
} from "graphql-request/build/esm/types";

import { ERROR_MESSAGE } from "@/constants";

export type FetcherGQLData<V> = {
  document: DocumentNode;
  variables?: V;
  requestHeaders?: GraphQLClientRequestHeaders;
  signal?: AbortSignal;
};

export const fetcherGQLData = async <T, V extends Variables = Variables>({
  document,
  variables,
  requestHeaders,
  signal,
}: FetcherGQLData<V>): Promise<T> => {
  const url = process.env.NEXT_PUBLIC_API_APOLLO;
  if (url === undefined) {
    throw new Error(ERROR_MESSAGE.URL_IS_UNDEFINED);
  }

  return request({ url, document, variables, requestHeaders, signal });
};
