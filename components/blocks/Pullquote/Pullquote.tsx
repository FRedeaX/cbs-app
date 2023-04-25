import classNames from "classnames";
import { FC } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";
import { Figure, FigureFigcaption } from "../../Figure";
import { Paragraph } from "../Paragraph/Paragraph";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, Gradient, HorizontalAlign } from "../utils/types";
import classes from "./Pullquote.module.css";

type PullquoteProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Цитата.
   */
  value: string;
  /**
   * Цитирование.
   */
  citation?: string;
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  textAlign?: HorizontalAlign;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;

  backgroundColor?: Color;
  borderColor?: Color;
  gradient?: Gradient;
  style?: Nullable<string>;
  textColor?: Color;
};

export const Pullquote: FC<PullquoteProps> = ({
  anchor,
  value,
  citation,
  textAlign,
  className,
  backgroundColor,
  borderColor,
  gradient,
  style,
  textColor,
}) => {
  const styleDiv = parseBlockStyle({
    textColor,
    backgroundColor,
    gradient,
    borderColor,
    style,
  });

  return (
    <div
      id={anchor || undefined}
      style={styleDiv}
      className={classNames(
        classes.root,
        {
          [classes[`root_align_${textAlign}`]]: textAlign !== undefined,
        },
        className,
      )}>
      <Figure className={classes.Figure}>
        <blockquote className={classes.blockquote}>
          <Paragraph align={textAlign} content={value} />
        </blockquote>
        {citation && <FigureFigcaption text={citation} component="cite" />}
      </Figure>
    </div>
  );
};
