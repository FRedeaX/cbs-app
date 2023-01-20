import { useContext } from "react";

import { SuggestionContext } from "./Suggestion.Context";

export * from "./Suggestion.Provider";

export const useSuggestionContext = () => {
  const context = useContext(SuggestionContext);
  if (context === undefined || context === null) {
    throw new Error(
      "useSuggestionContext must be used within a SuggestionProvider",
    );
  }
  return context;
};
