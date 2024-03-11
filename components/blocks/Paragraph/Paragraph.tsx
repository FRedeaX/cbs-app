import { Typography, TypographyProps } from "@mui/material";
import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

import { createMarkup } from "../../../helpers";
import {
  CSSProperties,
  Nullable,
} from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, FontSize, Gradient, HorizontalAlign } from "../utils/types";

import classes from "./Paragraph.module.css";

type ExcludeProps = "className" | "style";

type ParagraphProps = {
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  align?: HorizontalAlign;
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Текст компонента или `children`.
   */
  content?: string;
  fontSize?: FontSize;
  textColor?: Color;
  backgroundColor?: Color;
  gradient?: Gradient;
  style?: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
} & Omit<HTMLAttributes<HTMLParagraphElement>, ExcludeProps> &
  Omit<TypographyProps, ExcludeProps>;

export const Paragraph: FC<ParagraphProps> = ({
  align,
  anchor,
  className,
  content,
  fontSize,
  textColor,
  backgroundColor,
  gradient,
  style,
  component = "p",
  ...props
}) => {
  const styleTypography: CSSProperties = parseBlockStyle({
    textColor,
    backgroundColor,
    gradient,
    fontSize,
    style,
  });

  return (
    <Typography
      id={anchor || undefined}
      style={styleTypography}
      align={align}
      variant="responsiveText"
      component={component}
      className={classNames(className, classes.root)}
      dangerouslySetInnerHTML={createMarkup(content)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
