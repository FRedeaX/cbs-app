import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import {
  SearchParams,
  SearchResponseFrontend,
} from "@/core/elastic/search/type";
import { exceptionLog, FetcherData, fetcherData } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";

type SWRKey = FetcherData & SearchParams;

export const useQuerySearch = (ssrData: SearchResponseFrontend) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams ?? {});
  const query: SearchParams = Object.fromEntries(params);

  params.delete("text");

  const url = `${process.env.NEXT_PUBLIC_API_ES_URL}?${params.toString()}`;
  const text = query.text?.trim();

  const { data, isValidating, error } = useSWR<
    SearchResponseFrontend,
    string,
    Nullable<SWRKey>
  >({ url, text }, fetcherData, {
    keepPreviousData: true,
    fallbackData: ssrData,
  });

  if (error !== undefined) {
    exceptionLog(error);
  }

  return {
    data,
    isLoading: isValidating,
  };
};
