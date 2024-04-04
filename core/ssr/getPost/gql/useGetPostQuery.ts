import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { FetcherGQLData, fetcherGQLData } from "@/helpers/fetcherGQLData";
import { REVALIDATE } from "@/constants";

import {
  GetPostQuery,
  GetPostQueryVariables,
  getPostDocument,
} from "./getPostGQL";

export const useGetPostQuery = (
  variables: GetPostQueryVariables,
  config?: SWRConfiguration<
    GetPostQuery,
    Error,
    Fetcher<GetPostQuery, FetcherGQLData<GetPostQueryVariables>>
  >,
) =>
  useSWR<GetPostQuery, Error, FetcherGQLData<GetPostQueryVariables>>(
    { document: getPostDocument, variables },
    fetcherGQLData,
    { refreshInterval: REVALIDATE.PREVIEW_POLL_INTERVAL, ...config },
  );
