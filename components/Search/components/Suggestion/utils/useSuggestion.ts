/* eslint-disable no-underscore-dangle */
import { useRouter } from "next/router";
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback } from "react";

import { SEARCH_PATHNAME } from "../../../../../constant";
import { createSearchLink } from "../../../utils/createSearchLink";
import { useSuggestionContext } from "../context";
import { clampLoop } from "./clampLoop";

type OnClickLink = (event: MouseEvent<HTMLAnchorElement>) => void;
type OnKeyDownSetHighlight = (event: KeyboardEvent<HTMLInputElement>) => void;
type HandlerSetHighlight = (
  event: MouseEvent<HTMLDivElement> | FocusEvent<HTMLDivElement>,
) => void;

export const useSuggestion = () => {
  const {
    highlightedIndex,
    setHighlightedIndex,
    suggestionList,
    setSuggestionList,
  } = useSuggestionContext();
  const { push: routerPush } = useRouter();

  /**
   * Сохраняет запрос в историю перед переходом к результату.
   */
  const onClickLink = useCallback<OnClickLink>(
    ({ currentTarget }) => {
      routerPush(
        createSearchLink(
          { text: currentTarget.innerText },
          `${window.location.origin}/${SEARCH_PATHNAME}`,
        ),
        undefined,
        {
          shallow: true,
          scroll: false,
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  /**
   * Выделяет `suggestion` при наведении курсора или при фокусировке с клавиатуры.
   */
  const handlerSetHighlight = useCallback<HandlerSetHighlight>(
    ({ currentTarget }) => {
      const index = parseInt(currentTarget.dataset.index ?? "-1", 10);
      setHighlightedIndex(index);
    },
    [setHighlightedIndex],
  );

  /**
   * - Выделяет `suggestion` при навигации с помощью стрелок на клавиатуре.
   * - При нажатии на клавишу `Enter` сохраняет запрос в историю и переходит к результату.
   */
  const onKeyDownSetHighlight = useCallback<OnKeyDownSetHighlight>(
    (event) => {
      switch (event.code) {
        case "ArrowDown": {
          setHighlightedIndex((prev) =>
            clampLoop(-1, prev + 1, suggestionList.length - 1),
          );
          event.preventDefault();
          break;
        }

        case "ArrowUp": {
          setHighlightedIndex((prev) =>
            clampLoop(-1, prev - 1, suggestionList.length - 1),
          );
          event.preventDefault();
          break;
        }

        case "Enter": {
          if (highlightedIndex === -1) return;
          event.preventDefault();

          const { _source } = suggestionList[highlightedIndex];
          routerPush(
            createSearchLink(
              { text: _source.title },
              `${window.location.origin}/${SEARCH_PATHNAME}`,
            ),
            undefined,
            {
              shallow: true,
              scroll: false,
            },
          );
          routerPush(_source.link);

          break;
        }
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setHighlightedIndex, suggestionList, highlightedIndex],
  );

  return {
    highlightedIndex,
    handlerSetHighlight,
    onKeyDownSetHighlight,
    onClickLink,
    setSuggestionList,
  };
};
