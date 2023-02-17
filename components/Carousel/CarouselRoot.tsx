import { FC } from "react";

import { Carousel, CarouselProps } from "./Carousel";
import { CarouselProvider, CarouselProviderProps } from "./Context";

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
}) => (
  <CarouselProvider
    itemMargin={itemMargin}
    typeMovement={typeMovement}
    isResponsiveWidthsChildren={isResponsiveWidthsChildren}>
    <Carousel
      className={className}
      isButtonsOnSides={isButtonsOnSides}
      isShadow={isShadow}>
      {children}
    </Carousel>
  </CarouselProvider>
);
