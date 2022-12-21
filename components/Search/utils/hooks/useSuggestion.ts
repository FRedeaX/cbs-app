import { KeyboardEvent, MouseEvent, useCallback, useContext } from "react";

import { SuggestionContext } from "../../components/Suggestion/Context/Suggestion.Context";
import { clampLoop } from "../clampLoop";

type OnKeyDownSetHighlight = (event: KeyboardEvent<HTMLInputElement>) => void;
type OnMouseOverSetHighlight = (event: MouseEvent<HTMLDivElement>) => void;

export const useSuggestion = () => {
  const {
    highlightedIndex,
    setHighlightedIndex,
    suggestCount,
    setSuggestCount,
  } = useContext(SuggestionContext);

  const onMouseOverSetHighlight = useCallback<OnMouseOverSetHighlight>(
    ({ currentTarget }) => {
      const index = parseInt(currentTarget.dataset.index ?? "-1", 10);
      setHighlightedIndex(index);
    },
    [setHighlightedIndex],
  );

  const onKeyDownSetHighlight = useCallback<OnKeyDownSetHighlight>(
    (event) => {
      switch (event.code) {
        case "ArrowDown": {
          setHighlightedIndex((prev) => {
            const t = clampLoop(0, prev + 1, suggestCount);
            console.log({ prev, suggestCount, t });

            return t;
          });

          event.preventDefault();
          break;
        }

        case "ArrowUp": {
          setHighlightedIndex((prev) => clampLoop(0, prev - 1, suggestCount));
          event.preventDefault();
          break;
        }

        case "Enter": {
          // this.selectHighlightedElement();
          console.log("enter");
          break;
        }
        default:
          break;
      }
    },
    [setHighlightedIndex, suggestCount],
  );

  return {
    highlightedIndex,
    onMouseOverSetHighlight,
    onKeyDownSetHighlight,
    setSuggestCount,
  };
};
