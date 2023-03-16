import { FC } from "react";

import { CSSProperties } from "../../../helpers/typings/utility-types";
import classes from "./Separator.module.css";
import { SeparatorBlockAttributes, SeparatorStyle } from "./utils/separatorGQL";

export const Separator: FC<SeparatorBlockAttributes> = ({
  className,
  backgroundColor,
  gradient,
  style,
}) => {
  const styleHR: CSSProperties = {};
  const isDots = className === "is-style-dots";

  if (backgroundColor) {
    styleHR[
      isDots ? "color" : "backgroundColor"
    ] = `var(--wp--preset--color--${backgroundColor})`;
  }
  if (gradient && !isDots) {
    styleHR.background = `var(--wp--preset--gradient--${gradient})`;
  }

  if (style !== null) {
    const stypeParse: SeparatorStyle = JSON.parse(style);

    if (stypeParse.color.background !== undefined) {
      styleHR[isDots ? "color" : "backgroundColor"] =
        stypeParse.color.background;
    }
    if (stypeParse.color.gradient !== undefined && !isDots) {
      styleHR.background = stypeParse.color.gradient;
    }
  }

  return <hr style={styleHR} className={classes[className]} />;
};
