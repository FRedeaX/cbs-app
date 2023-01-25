import { FC, ReactNode, useCallback, useMemo, useState } from "react";

import { SuggestionList } from "../../../../../core/elastic/type";
import {
  HighlightedIndex,
  SetSuggestionList,
  SuggestionContext,
} from "./Suggestion.Context";

export const SuggestionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [highlightedIndex, setHighlightedIndex] =
    useState<HighlightedIndex>(-1);

  const [suggestionList, setSuggestionList] = useState<SuggestionList>([]);

  const setSuggestionListAndResetIndex = useCallback<SetSuggestionList>(
    (nodes) => {
      setSuggestionList(nodes);
      setHighlightedIndex(-1);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      highlightedIndex,
      setHighlightedIndex,

      suggestionList,
      setSuggestionList: setSuggestionListAndResetIndex,
    }),
    [suggestionList, highlightedIndex, setSuggestionListAndResetIndex],
  );

  return (
    <SuggestionContext.Provider value={contextValue}>
      {children}
    </SuggestionContext.Provider>
  );
};
