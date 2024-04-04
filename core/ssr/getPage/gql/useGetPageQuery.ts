import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { FetcherGQLData, fetcherGQLData } from "@/helpers/fetcherGQLData";
import { REVALIDATE } from "@/constants";

import {
  GetPageQuery,
  GetPageQueryVariables,
  getPageDocument,
} from "./getPageGQL";

export const useGetPageQuery = (
  variables: GetPageQueryVariables,
  config?: SWRConfiguration<
    GetPageQuery,
    Error,
    Fetcher<GetPageQuery, FetcherGQLData<GetPageQueryVariables>>
  >,
) =>
  useSWR<GetPageQuery, Error, FetcherGQLData<GetPageQueryVariables>>(
    { document: getPageDocument, variables },
    fetcherGQLData,
    { refreshInterval: REVALIDATE.PREVIEW_POLL_INTERVAL, ...config },
  );
