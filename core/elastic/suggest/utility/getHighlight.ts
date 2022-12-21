import match from "autosuggest-highlight/match";
import { SuggestResponseData } from "../type";

export const getHighlight = (
  suggest: SuggestResponseData,
  query: string
): [number, number][] => {
  const result 
  suggest.title[0].options.forEach(({text}) => {
    match(text, query);

})
};
