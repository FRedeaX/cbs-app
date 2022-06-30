/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { isFront } from "../../helpers";
import isIntersection from "../../helpers/frontend/isIntersection";
import CarouselLegacy, {
  CarouselLegacyProps,
} from "./CarouselLegacy/Carousel.Legacy";
import Carusel, { Carusel2Props } from "./Carusel";

const CaruselRoot: FC<Carusel2Props | CarouselLegacyProps> = (props) => {
  if (isFront && !isIntersection) {
    <CarouselLegacy {...(props as CarouselLegacyProps)} />;
  }
  return <Carusel {...(props as Carusel2Props)} />;
};

export default CaruselRoot;
