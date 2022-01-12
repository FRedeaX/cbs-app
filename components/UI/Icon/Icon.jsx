import classNames from "classnames";

import GetGlyph from "./GetGlyph";
import classes from "./Icon.module.css";

const Icon = ({
  type = "arrow",
  size = "m",
  isGlyph = "false",
  side = "right",
  direction,
  weight = "medium",
  className,
}) =>
  isGlyph === true ? (
    <span
      className={classNames(
        classes.icon,
        classes[`size_${size}`],
        {
          [classes[`side_${side}`]]: side !== "center",
          [classes[`direction_${direction}`]]: direction !== undefined,
        },
        className,
      )}
      aria-hidden>
      <GetGlyph type={type} className={classes.glyph} />
    </span>
  ) : (
    <span
      className={classNames(
        classes.icon,
        classes[`type_${type}`],
        classes[`size_${size}`],
        {
          [classes[`side_${side}`]]: side !== "center",
          [classes[`arrow_weight_${weight}`]]: type === "arrow",
          [classes[`direction_${direction}`]]: direction !== undefined,
        },
        className,
      )}
      aria-hidden
    />
  );

export default Icon;
