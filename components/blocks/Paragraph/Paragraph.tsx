import { Typography } from "@mui/material";
import classNames from "classnames";
import { ElementType, FC, HTMLAttributes } from "react";

import { createMarkup } from "../../../helpers";
import {
  CSSProperties,
  Nullable,
} from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, FontSize, Gradient, HorizontalAlign } from "../utils/types";
import classes from "./Paragraph.module.css";

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
  /**
   * Компонент, используемый для корневого узла.
   * Либо строка для использования HTML-элемента, либо компонент.
   * @default "p"
   */
  component?: ElementType;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "className" | "style">;

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
      className={classNames(classes.root, className)}
      dangerouslySetInnerHTML={createMarkup(content)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
