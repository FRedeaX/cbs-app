import { useContext } from "react";
import useSWR from "swr";

import {
  SuggestQueryParams,
  SuggestResponseData,
} from "../../../../core/elastic/type";
import { hasAppendPathname } from "../../../../helpers";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { InputContext } from "../../components/Input/Context/Input.Context";
import { FetchSearchData, fetchSearchData } from "../fetchSearchData";
import { useSuggestion } from "./useSuggestion";

type SWRKey = FetchSearchData & SuggestQueryParams;

export const useQuerySuggest = () => {
  const { value } = useContext(InputContext);
  const { setSuggestCount } = useSuggestion();

  const { data } = useSWR<SuggestResponseData, unknown, Nullable<SWRKey>>(
    value
      ? {
          apiUrl: hasAppendPathname(
            process.env.NEXT_PUBLIC_API_ES_URL,
            "suggest",
          ),
          text: value,
        }
      : null,
    fetchSearchData,
    {
      onSuccess: (d) => {
        setSuggestCount(d.hits.hits.length - 1);
      },
    },
  );
  return { data: data?.hits.hits };
};
