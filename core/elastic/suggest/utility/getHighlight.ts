/* eslint-disable no-underscore-dangle */
import match from "autosuggest-highlight/match";

import { SuggestionList } from "../type";

/**
 * Возвращает массив с номерами позиций совпадающих символов.
 * @param suggest Массив предложений.
 * @param query Текс поиска.
 */
export const getHighlight = (
  suggest: SuggestionList | [],
  query: string,
): SuggestionList | [] =>
  suggest.map((node) => ({
    ...node,
    highlight: {
      title: match(node._source.title, query),
    },
  }));
