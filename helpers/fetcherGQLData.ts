import { DocumentNode } from "graphql";
import { request } from "graphql-request";
import {
  Variables,
  VariablesAndRequestHeadersArgs,
} from "graphql-request/build/esm/types";

import { ERROR_MESSAGE } from "@/constants";

export type FetcherGQLData<V> = {
  query: DocumentNode;
  variables: V;
};

export const fetcherGQLData = async <T, V extends Variables = Variables>({
  query,
  variables,
}: FetcherGQLData<V>): Promise<T> => {
  const url = process.env.NEXT_PUBLIC_API_APOLLO;
  if (url === undefined) {
    throw new Error(ERROR_MESSAGE.URL_IS_UNDEFINED);
  }

  const args: VariablesAndRequestHeadersArgs<Variables> = [variables];

  return request(url, query, ...args);
};
