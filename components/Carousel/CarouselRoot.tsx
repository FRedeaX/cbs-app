/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { Carousel, CarouselProps } from "./Carousel";
import { CarouselProvider } from "./Context";

export const CarouselRoot: FC<CarouselProps> = ({
  itemMargin,
  children,
  ...props
}) => (
  <CarouselProvider itemMargin={itemMargin}>
    <Carousel itemMargin={itemMargin} {...props}>
      {children}
    </Carousel>
  </CarouselProvider>
);
