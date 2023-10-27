import { FC } from "react";

import { Carousel, CarouselProps } from "./Carousel";
import { CarouselProvider, CarouselProviderProps } from "./context";

export const CarouselRoot: FC<
  CarouselProps & Omit<CarouselProviderProps, "children">
> = ({
  children,
  sx,
  className,
  scrollerProps,
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
      sx={sx}
      className={className}
      scrollerProps={scrollerProps}
      isButtonsOnSides={isButtonsOnSides}
      isShadow={isShadow}>
      {children}
    </Carousel>
  </CarouselProvider>
);
