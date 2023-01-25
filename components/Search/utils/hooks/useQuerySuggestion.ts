import useSWR from "swr";

import {
  SuggestQueryParams,
  SuggestResponseData,
} from "../../../../core/elastic/type";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { useInputContext } from "../../components/Input/context";
import { useSuggestion } from "../../components/Suggestion/utils/useSuggestion";
import { FetchSearchData, fetchSearchData } from "../fetchSearchData";

type SWRKey = FetchSearchData & SuggestQueryParams;

export const useQuerySuggestion = () => {
  const { value } = useInputContext();
  const { setSuggestionList } = useSuggestion();

  const { data } = useSWR<SuggestResponseData, unknown, Nullable<SWRKey>>(
    value
      ? {
          pathname: "suggest",
          text: value.trim(),
        }
      : null,
    fetchSearchData,
    {
      onSuccess: (d) => {
        setSuggestionList(d.hits.hits);
      },
    },
  );

  return { data: data?.hits.hits };
};
