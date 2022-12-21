import { FC, ReactNode, useCallback, useMemo, useState } from "react";

import {
  HighlightedIndex,
  SetSuggestCount,
  SuggestCount,
  SuggestionContext,
} from "./Suggestion.Context";

export const SuggestionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [highlightedIndex, setHighlightedIndex] =
    useState<HighlightedIndex>(-1);

  const [suggestCount, setSuggestCount] = useState<SuggestCount>(0);

  const setCountAndResetIndex = useCallback<SetSuggestCount>((count) => {
    setSuggestCount(count);
    setHighlightedIndex(-1);
  }, []);

  const contextValue = useMemo(
    () => ({
      highlightedIndex,
      setHighlightedIndex,

      suggestCount,
      setSuggestCount: setCountAndResetIndex,
    }),
    [suggestCount, highlightedIndex, setCountAndResetIndex],
  );

  return (
    <SuggestionContext.Provider value={contextValue}>
      {children}
    </SuggestionContext.Provider>
  );
};
