import useSWR from "swr";

import { SuggestQueryParams, SuggestResponseData } from "@/core/elastic/type";
import { FetcherData, fetcherData } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";

import { useInputContext } from "../../components/Input/context";
import { useSuggestion } from "../../components/Suggestion/utils/useSuggestion";

type SWRKey = FetcherData & SuggestQueryParams;

export const useQuerySuggestion = () => {
  const { value } = useInputContext();
  const { setSuggestionList } = useSuggestion();

  const { data } = useSWR<SuggestResponseData, unknown, Nullable<SWRKey>>(
    value
      ? {
          url: `${process.env.NEXT_PUBLIC_API_ES_URL}/suggest`,
          text: value.trim(),
        }
      : null,
    fetcherData,
    {
      onSuccess: (d) => {
        setSuggestionList(d.hits.hits);
      },
    },
  );

  return { data: data?.hits.hits };
};
