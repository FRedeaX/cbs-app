import { Children, FC, ReactElement, cloneElement } from "react";

import { useCarouselContext } from "./Context";

type CarouselListProps = {
  children: ReactElement[];
};

const CarouselList: FC<CarouselListProps> = ({ children }) => {
  const { setItemWidth } = useCarouselContext();

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
