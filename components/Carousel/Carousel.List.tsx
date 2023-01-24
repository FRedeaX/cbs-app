import { Children, FC, ReactElement, cloneElement } from "react";

import { useCarousel } from "./Carousel.utils/useCarousel";

type CarouselListProps = {
  children: ReactElement[];
};

const CarouselList: FC<CarouselListProps> = ({ children }) => {
  const { setItemWidth } = useCarousel();

  return (
    <>
      {Children.map(children, (child: ReactElement) =>
        cloneElement(child, {
          ref: (ref: HTMLElement) => {
            if (!ref) return;
            setItemWidth(ref.clientWidth);
          },
        }),
      )}
    </>
  );
};

export default CarouselList;
