import { useRouter } from "next/router";
import useSWR from "swr";

import {
  SearchParams,
  SearchResponseFrontend,
} from "../../../../core/elastic/search/type";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { FetchSearchData, fetchSearchData } from "../fetchSearchData";

type SWRKey = FetchSearchData & SearchParams;

export const useQuerySearch = (ssrData: SearchResponseFrontend) => {
  const { text, categories, departments, page } = useRouter()
    .query as SearchParams;
  const textSearch = text?.trim();

  const { data, isValidating } = useSWR<
    SearchResponseFrontend,
    unknown,
    Nullable<SWRKey>
  >(
    {
      pathname: "",
      text: textSearch,
      departments,
      categories,
      page,
    },
    fetchSearchData,
    {
      fallbackData: ssrData,
    },
  );

  return {
    data,
    isLoading: isValidating,
  };
};
