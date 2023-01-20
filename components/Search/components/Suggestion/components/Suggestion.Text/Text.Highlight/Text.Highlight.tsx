import { FC, Fragment } from "react";

import { Highlight } from "../../../../../../../core/elastic/type";
import classes from "./Text.Highlight.module.css";

type TextHighlightProps = {
  /**
   * Массив с номерами позиций совпадающих символов.
   */
  highlight: Highlight;

  /**
   * Строка предложения.
   */
  text: string;
};

export const TextHighlight: FC<TextHighlightProps> = ({ highlight, text }) => {
  if (highlight.length === 0) return <span>{text}</span>;

  const lastHighlight = highlight[highlight.length - 1];
  return (
    <>
      {text.substring(0, highlight[0][0])}
      {highlight.map((item, index) => {
        const nextItem = highlight[index + 1];
        const skiped = nextItem && [item[1], nextItem[0]];

        return (
          <Fragment key={item[0]}>
            <span className={classes.root}>
              {text.substring(item[0], item[1])}
            </span>
            {skiped && text.substring(skiped[0], skiped[1])}
          </Fragment>
        );
      })}
      {text.substring(lastHighlight[1], text.length)}
    </>
  );
};
