import { FC, ReactNode, useCallback, useMemo, useRef } from "react";

import { FULL_MARGIN } from "../Carousel.const";
import {
  CarouselContext,
  CarouselContextHTMLNode,
  CarouselContextHandleOnScroll,
  CarouselContextSetItemWidth,
} from "./Carousel.Context";

type CarouselProviderProps = {
  children: ReactNode;

  /**
   * Отступ у элемента с одной стороны
   *
   * @default 0
   */
  itemMargin?: number;

  length: number;
};

export const CarouselProvider: FC<CarouselProviderProps> = ({
  children,
  itemMargin = 0,
  length,
}) => {
  const rootRef = useRef<CarouselContextHTMLNode>(null);
  const leftSideNodeRef = useRef<CarouselContextHTMLNode>(null);
  const rightSideNodeRef = useRef<CarouselContextHTMLNode>(null);

  const scroll = useRef(0);
  const itemWidthAccumulatedASC = useRef<number[]>([]);
  const itemWidthAccumulatedDESC = useRef<number[]>([]);

  const setItemWidth = useCallback<CarouselContextSetItemWidth>(
    (width) => {
      if (itemWidthAccumulatedDESC.current.length === length - 1) return;

      const margin = itemMargin * FULL_MARGIN;

      const currentASC = itemWidthAccumulatedASC.current;
      const lastValue = currentASC[currentASC.length - 1] ?? 0;
      currentASC.push(width + margin + lastValue);

      const currentDESC = itemWidthAccumulatedDESC.current;
      const firstValue = currentDESC[0] ?? 0;
      currentDESC.unshift(width + margin + firstValue);
    },
    [itemMargin, length],
  );

  const handleOnScroll = useCallback<CarouselContextHandleOnScroll>((event) => {
    scroll.current = event.currentTarget.scrollLeft;
  }, []);

  const value = useMemo(
    () => ({
      rootRef,
      leftSideNodeRef,
      rightSideNodeRef,
      scroll,
      itemMargin,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
      setItemWidth,
      handleOnScroll,
    }),
    [itemMargin, setItemWidth, handleOnScroll],
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
