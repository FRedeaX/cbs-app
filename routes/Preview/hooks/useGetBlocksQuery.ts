import useSWR, { Fetcher, SWRConfiguration, SWRResponse } from "swr";

import { FetcherData, fetcherData } from "@/helpers";
import { Defaultize, Nullable } from "@/helpers/typings/utility-types";
import { ResponseTransformBlocksData } from "pages/api/transformBlocks";

type SWRKey = FetcherData & {
  body: string;
  method: "POST";
};

type SWRConfig = SWRConfiguration<
  ResponseTransformBlocksData,
  Error,
  Fetcher<ResponseTransformBlocksData, Nullable<SWRKey>>
>;

export const useGetBlocksQuery = (
  variables: Nullable<SWRKey>,
  config?: SWRConfig & Defaultize<SWRConfig, "fallbackData">,
) =>
  useSWR<ResponseTransformBlocksData, Error, Nullable<SWRKey>>(
    variables,
    fetcherData,
    {
      revalidateOnFocus: false,
      fallbackData: { blocks: [], video: [] },
      ...config,
    },
    // Используем утверждение типов т.к.
    // есть `fallbackData` ответ не равен `undefined`.
  ) as { data: ResponseTransformBlocksData } & SWRResponse;
