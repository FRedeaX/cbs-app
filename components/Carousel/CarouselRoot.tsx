/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { Carousel, CarouselProps } from "./Carousel";
import { CarouselProvider } from "./Context";

export const CarouselRoot: FC<CarouselProps> = (props) => (
  <CarouselProvider length={10} itemMargin={5}>
    <Carousel
      {...props}
      // useCarousel={useCarousel}
      // useCarousel={useCarousel as (args: IArgs) => useCarouselHookResult}
      // useCarousel={useCarousel}
    />
  </CarouselProvider>
);
