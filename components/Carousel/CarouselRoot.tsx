import { FC } from "react";

import { Carousel, CarouselProps } from "./Carousel";
import { CarouselProvider, CarouselProviderProps } from "./context";

export const CarouselRoot: FC<
  CarouselProps & Omit<CarouselProviderProps, "children">
> = ({
  children,
  className,
  isButtonsOnSides,
  isShadow,
  itemMargin,
  typeMovement,
  isResponsiveWidthsChildren,
  skip,
}) => (
  <CarouselProvider
    itemMargin={itemMargin}
    typeMovement={typeMovement}
    isResponsiveWidthsChildren={isResponsiveWidthsChildren}
    skip={skip}>
    <Carousel
      className={className}
      isButtonsOnSides={isButtonsOnSides}
      isShadow={isShadow}>
      {children}
    </Carousel>
  </CarouselProvider>
);
