/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { isFront } from "../../helpers";
import isIntersection from "../../helpers/frontend/isIntersection";
import Carousel, { ICarouselProps, IUseCarousel } from "./Carousel";
import { useCarousel, useCarouselLegacy } from "./Carousel.utils";

type carouselProps = Omit<ICarouselProps, "useCarousel">;
interface ICarouselRootProps extends carouselProps {
  useCarousel?: IUseCarousel;
}

const CarouselRoot: FC<ICarouselRootProps> = (props) => (
  <Carousel
    {...props}
    // useCarousel={useCarousel}
    // useCarousel={useCarousel as (args: IArgs) => useCarouselHookResult}
    useCarousel={isFront && !isIntersection ? useCarouselLegacy : useCarousel}
  />
);

export default CarouselRoot;
