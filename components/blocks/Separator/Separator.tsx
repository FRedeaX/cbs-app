import classNames from "classnames";
import { FC } from "react";

import {
  CSSProperties,
  Nullable,
} from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, Gradient } from "../utils/types";
import classes from "./Separator.module.css";
import { SeparatorVariant } from "./utils/separatorGQL";

type SeparatorProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * @default 'is-style-default'
   */
  variant?: SeparatorVariant;
  backgroundColor?: Color;
  className?: string | classNames.ArgumentArray;
  gradient?: Gradient;
  style?: Nullable<string>;
};

export const Separator: FC<SeparatorProps> = ({
  anchor,
  variant = "is-style-default",
  className,
  backgroundColor,
  gradient,
  style,
}) => {
  const isDots = variant === "is-style-dots";
  const styleHR: CSSProperties = parseBlockStyle({
    backgroundColor,
    gradient,
    style,
    styleBackground: isDots ? "color" : "backgroundColor",
  });

  return (
    <hr
      id={anchor || undefined}
      style={styleHR}
      className={classNames(classes[variant], className)}
    />
  );
};
