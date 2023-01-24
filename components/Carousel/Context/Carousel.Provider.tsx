import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { useClientWidth } from "../../../helpers/frontend/hooks";
import {
  Maybe,
  _NodeListOf as NodeListOf,
} from "../../../helpers/typings/utility-types";
import { fillOffsetArray } from "../Carousel.utils/fillOffsetArray";
import {
  CarouselContext,
  CarouselContextHTMLNode,
  CarouselContextItemListRefCallback,
  CarouselContextScrollToIndex,
} from "./Carousel.Context";

type CarouselProviderProps = {
  children: ReactNode;

  /**
   * Отступ у элемента с одной стороны
   *
   * @default 0
   */
  itemMargin?: number;
};

export const CarouselProvider: FC<CarouselProviderProps> = ({
  children,
  itemMargin = 0,
}) => {
  const rootRef = useRef<CarouselContextHTMLNode>(null);
  const itemListRef = useRef<Maybe<NodeListOf<HTMLElement>>>(undefined);
  const leftSideNodeRef = useRef<CarouselContextHTMLNode>(null);
  const rightSideNodeRef = useRef<CarouselContextHTMLNode>(null);

  const scroll = useRef(0);
  const indexOfVisibleElement = useRef(0);
  const itemWidthAccumulatedASC = useRef<number[]>([]);
  const itemWidthAccumulatedDESC = useRef<number[]>([]);

  const init = useCallback(() => {
    if (itemListRef.current === undefined) return;

    const { itemWidthAccASC, itemWidthAccDESC } = fillOffsetArray(
      itemListRef.current,
      itemMargin,
    );

    itemWidthAccumulatedASC.current = itemWidthAccASC;
    itemWidthAccumulatedDESC.current = itemWidthAccDESC;
  }, [itemMargin]);

  const scrollToIndex = useCallback<CarouselContextScrollToIndex>((index) => {
    if (rootRef.current === null) return;
    if (index !== undefined) {
      indexOfVisibleElement.current = index;
    }

    const root = rootRef.current;
    const itemWidthAccASC = itemWidthAccumulatedASC.current;

    scroll.current = itemWidthAccASC[indexOfVisibleElement.current];
    root.scrollTo({
      left: scroll.current,
      behavior: "auto",
    });
  }, []);

  // Провоцирует пересчет прямого и обратного массива смещений
  const resizeWidth = useClientWidth();
  useEffect(() => {
    init();
    scrollToIndex();
  }, [init, scrollToIndex, resizeWidth]);

  const itemListRefCallback = useCallback<CarouselContextItemListRefCallback>(
    (node) => {
      itemListRef.current = node?.childNodes as NodeListOf<HTMLElement>;
      init();
    },
    [init],
  );

  const value = useMemo(
    () => ({
      rootRef,
      itemListRefCallback,
      leftSideNodeRef,
      rightSideNodeRef,
      scroll,
      indexOfVisibleElement,
      scrollToIndex,
      itemMargin,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
    }),
    [itemListRefCallback, scrollToIndex, itemMargin],
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
