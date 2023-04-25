import classNames from "classnames";
import { FC, ReactElement } from "react";

import { Figure, FigureFigcaption } from "../../Figure";
import { HorizontalAlign } from "../utils/types";
import classes from "./Quote.module.css";

type QuoteProps = {
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   * @default 'left'
   */
  align?: HorizontalAlign;
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Цитирование.
   */
  citation?: string;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  children: ReactElement;
};

export const Quote: FC<QuoteProps> = ({
  align = "left",
  anchor,
  citation,
  className,
  children,
}) => (
  <div
    id={anchor || undefined}
    className={classNames(
      classes.root,
      classes[`root_align_${align}`],
      className,
    )}>
    <div className={classes.line} />
    <Figure>
      <blockquote className={classes.blockquote}>{children}</blockquote>
      {citation && <FigureFigcaption text={citation} />}
    </Figure>
  </div>
);
