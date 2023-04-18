import classNames from "classnames";
import { FC, ReactElement } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, FontSize, Gradient } from "../utils/types";
import classes from "./Columns.module.css";

type СolumnsProps = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Группировать друг над другом на мобильных устройствах.
   */
  isStackedOnMobile: string;
  fontSize?: FontSize;
  textColor?: Color;
  backgroundColor?: Color;
  gradient?: Gradient;
  borderColor?: Color;
  style?: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  children: ReactElement;
};

export const Columns: FC<СolumnsProps> = ({
  anchor,
  isStackedOnMobile,
  fontSize,
  textColor,
  backgroundColor,
  gradient,
  borderColor,
  style,
  className,
  children,
}) => {
  const styleDiv = parseBlockStyle({
    fontSize,
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
      className={classNames(classes.root, className)}>
      <div
        className={classNames(classes.wrapper, {
          [classes.wrapper_direction_column]: isStackedOnMobile,
        })}>
        {children}
      </div>
    </div>
  );
};
