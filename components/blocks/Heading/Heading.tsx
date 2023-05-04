import { Typography, TypographyProps } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "../../../helpers";
import { Nullable } from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import {
  Color,
  FontSize,
  Gradient,
  HeadingLevel,
  HorizontalAlign,
} from "../utils/types";

export type HeadingProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Текст компонента.
   */
  content: string;
  /**
   * Уровень заголовка.
   * @default 2
   */
  level?: HeadingLevel;
  /*
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`.
   */
  textAlign?: HorizontalAlign;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;

  textColor?: Color;
  backgroundColor?: Color;
  fontSize?: FontSize;
  gradient?: Gradient;
  style?: Nullable<string>;
};

export const Heading: FC<HeadingProps> = ({
  anchor,
  content,
  level = 2,
  textAlign,
  className,
  textColor,
  backgroundColor,
  fontSize,
  gradient,
  style,
}) => {
  const variant = `h${level}` as TypographyProps["variant"];
  const styleTypography = parseBlockStyle({
    textColor,
    backgroundColor,
    fontSize,
    gradient,
    style,
  });

  return (
    <Typography
      id={anchor || undefined}
      style={styleTypography}
      align={textAlign}
      variant={variant}
      className={classNames(className)}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
};
