import { Variables } from "graphql-request";

import { FetcherGQLData, fetcherGQLData } from "./fetcherGQLData";

export const mutationGQLData = async <T, V extends Variables = Variables>(
  { document, requestHeaders, signal }: Omit<FetcherGQLData<V>, "variables">,
  { arg: variables }: { arg: V },
): Promise<T> =>
  fetcherGQLData({ document, variables, requestHeaders, signal });
