import { Dispatch, SetStateAction, createContext } from "react";

import { noop } from "../../../../../helpers";

export type HighlightedIndex = number;
export type SetHighlightedIndex = Dispatch<SetStateAction<HighlightedIndex>>;

export type SuggestCount = number;
export type SetSuggestCount = (count: SuggestCount) => void;

type Context = {
  /**
   * index выделеного элемента
   *
   * @default -1
   */
  highlightedIndex: HighlightedIndex;
  /**
   * Устанавливает index выделеного элемента
   */
  setHighlightedIndex: SetHighlightedIndex;

  /**
   * Количество предложений
   *
   * @default 0
   */
  suggestCount: SuggestCount;
  /**
   * Устанавливает доступное количество предложений
   */
  setSuggestCount: SetSuggestCount;
};

export const SuggestionContext = createContext<Context>({
  highlightedIndex: -1,
  setHighlightedIndex: noop,

  suggestCount: 0,
  setSuggestCount: noop,
});
