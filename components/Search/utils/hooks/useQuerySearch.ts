import { useRouter } from "next/router";
import useSWR from "swr";

import {
  SearchParams,
  SearchResponseFrontend,
} from "@/core/elastic/search/type";
import { exceptionLog, FetcherData, fetcherData } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";

type SWRKey = FetcherData & SearchParams;

export const useQuerySearch = (ssrData: SearchResponseFrontend) => {
  const { text, categories, departments, page } = useRouter()
    .query as SearchParams;
  const textSearch = text?.trim();

  const { data, isValidating, error } = useSWR<
    SearchResponseFrontend,
    string,
    Nullable<SWRKey>
  >(
    {
      url: process.env.NEXT_PUBLIC_API_ES_URL,
      text: textSearch,
      departments,
      categories,
      page,
    },
    fetcherData,
    {
      keepPreviousData: true,
      fallbackData: ssrData,
    },
  );

  if (error !== undefined) {
    exceptionLog(error);
  }

  return {
    data,
    isLoading: isValidating,
  };
};
