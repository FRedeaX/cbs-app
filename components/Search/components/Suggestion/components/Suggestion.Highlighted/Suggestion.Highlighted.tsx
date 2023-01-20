import classNames from "classnames";
import { FC, ReactNode } from "react";

import { useSuggestion } from "../../utils/useSuggestion";
import classes from "./Suggestion.Highlighted.module.css";

type SuggestionHighlightedProps = {
  children: ReactNode;
  index: number;
};

export const SuggestionHighlighted: FC<SuggestionHighlightedProps> = ({
  children,

  /**
   * Порядковый номер предложения.
   */
  index,
}) => {
  const { highlightedIndex, handlerSetHighlight } = useSuggestion();

  return (
    <div
      data-index={index}
      onMouseOver={handlerSetHighlight}
      onFocus={handlerSetHighlight}
      className={classNames(classes.root, {
        [classes["root--select"]]: index === highlightedIndex,
      })}>
      {children}
    </div>
  );
};
