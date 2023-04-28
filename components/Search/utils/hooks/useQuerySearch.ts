import { useRouter } from "next/router";
import useSWR from "swr";

import {
  SearchParams,
  SearchResponseFrontend,
} from "../../../../core/elastic/search/type";
import { exceptionLog } from "../../../../helpers";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { FetchSearchData, fetchSearchData } from "../fetchSearchData";

type SWRKey = FetchSearchData & SearchParams;

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

  if (error !== undefined) {
    exceptionLog(error);
  }

  return {
    data,
    isLoading: isValidating,
  };
};
