import classNames from "classnames";
import { FC } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";
import { Paragraph } from "../Paragraph/Paragraph";
import { Color, FontSize, Gradient, HorizontalAlign } from "../utils/types";
import classes from "./Verse.module.css";

type VerseProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  textAlign?: HorizontalAlign;
  /**
   * Текст компонента.
   */
  content: string;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;

  fontSize?: FontSize;
  textColor?: Color;
  backgroundColor?: Color;
  gradient?: Gradient;
  style?: Nullable<string>;
};

export const Verse: FC<VerseProps> = ({
  anchor,
  textAlign,
  content,
  className,
  fontSize,
  textColor,
  backgroundColor,
  gradient,
  style,
}) => (
  <Paragraph
    component="pre"
    align={textAlign}
    anchor={anchor}
    className={[classes.root, className]}
    content={content}
    fontSize={fontSize}
    textColor={textColor}
    backgroundColor={backgroundColor}
    gradient={gradient}
    style={style}
  />
);
