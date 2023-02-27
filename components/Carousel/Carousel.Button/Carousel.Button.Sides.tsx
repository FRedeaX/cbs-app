import { FC, ReactNode } from "react";

import classes from "./Carousel.Button.module.css";

const CarouselButtonSides: FC<{
  children: ReactNode;
  isButtonsOnSides: boolean;
}> = ({ children, isButtonsOnSides }) => (
  <div
    className={classes[`sides_${isButtonsOnSides}`]}
    aria-label="Элементы управления слайдером">
    {children}
  </div>
);

export default CarouselButtonSides;
