/* eslint-disable no-underscore-dangle */
import { FC } from "react";

import { SuggestHit, SuggestSource } from "../../../../../core/elastic/type";
import { Maybe } from "../../../../../helpers/typings/utility-types";
import { SuggestionHighlighted } from "./Suggestion.Highlighted/Suggestion.Highlighted";
import { SuggestionText } from "./Suggestion.Text/Suggestion.Text";

type SearchSuggestionListProps = { data: Maybe<SuggestHit<SuggestSource>[]> };

export const SearchSuggestionList: FC<SearchSuggestionListProps> = ({
  data,
}) => {
  if (data === undefined || data.length === 0) return null;

  return (
    <>
      {data.map((suggestion, index) => (
        <SuggestionHighlighted key={suggestion._id} index={index}>
          <SuggestionText suggestion={suggestion} />
        </SuggestionHighlighted>
      ))}
    </>
  );
};
