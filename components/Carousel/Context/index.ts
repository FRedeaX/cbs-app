import { useContext } from "react";

import { CarouselContext } from "./Carousel.Context";

export * from "./Carousel.Provider";

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === undefined || context === null) {
    throw new Error(
      "useCarouselContext must be used within a CarouselProvider",
    );
  }
  return context;
};
