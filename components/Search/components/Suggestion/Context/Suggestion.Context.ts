import { Dispatch, SetStateAction, createContext } from "react";

import { SuggestionList } from "../../../../../core/elastic/type";
import { Nullable } from "../../../../../helpers/typings/utility-types";

export type HighlightedIndex = number;
export type SetHighlightedIndex = Dispatch<SetStateAction<HighlightedIndex>>;

export type SetSuggestionList = (nodes: SuggestionList) => void;

type Context = {
  /**
   * `index` выделеного элемента.
   *
   * @default -1
   */
  highlightedIndex: HighlightedIndex;
  /**
   * Устанавливает `index` выделеного элемента.
   */
  setHighlightedIndex: SetHighlightedIndex;

  /**
   * Список предложений.
   *
   * @default []
   */
  suggestionList: SuggestionList;
  /**
   * Устанавливает список предложений.
   */
  setSuggestionList: SetSuggestionList;
};

export const SuggestionContext = createContext<Nullable<Context>>(null);
