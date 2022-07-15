import { FC, ReactNode } from "react";

import classes from "./Carousel.Shadow.module.css";

const CarouselShadowWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => <div className={classes.wrapper}>{children}</div>;

export default CarouselShadowWrapper;
