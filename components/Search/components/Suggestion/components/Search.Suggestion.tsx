/* eslint-disable no-underscore-dangle */
import { FC } from "react";

import { useQuerySuggestion } from "../../../utils/hooks";
import { useInputContext } from "../../Input/context";
import classes from "./Search.Suggestion.module.css";
import { SearchSuggestionList } from "./Search.SuggestionList";
import { SuggestionFade } from "./Suggestion.Fade/Suggestion.Fade";

export const SearchSuggestion: FC = () => {
  const { data } = useQuerySuggestion();
  const { isFocus } = useInputContext();

  const isVisible = !!data && data.length !== 0 && isFocus;
  return (
    <SuggestionFade isVisible={isVisible} className={classes.root}>
      <div className={classes.body}>
        <SearchSuggestionList data={data} />
      </div>
    </SuggestionFade>
  );
};
