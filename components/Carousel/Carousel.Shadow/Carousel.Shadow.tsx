import classNames from "classnames";
import { FC } from "react";

import classes from "./Carousel.Shadow.module.css";

interface ICarouselShadowProps {
  direction: "next" | "prev";
  isShadow: boolean;
  isActive: boolean;
}

const CarouselShadow: FC<ICarouselShadowProps> = ({
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

export default CarouselShadow;
