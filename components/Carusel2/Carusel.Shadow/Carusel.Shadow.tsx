import classNames from "classnames";
import { FC } from "react";
import classes from "./Carusel.Shadow.module.css";

interface CaruselShadowProps {
  direction: "next" | "prev";
  isShadow: boolean;
  isActive: boolean;
}

const CaruselShadow: FC<CaruselShadowProps> = ({
  direction,
  isShadow,
  isActive,
}) =>
  isShadow ? (
    <div
      className={classNames(
        classes.root,
        classes.root_visibility,
        classes[`root_visibility_${isActive}`],
        classes[`root_${direction}`],
      )}
    />
  ) : null;

export default CaruselShadow;
