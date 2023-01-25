import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import {
  Maybe,
  _NodeListOf as NodeListOf,
} from "../../../helpers/typings/utility-types";
import { fillOffsetArray } from "../Carousel.utils/fillOffsetArray";
import { scrollTo } from "../Carousel.utils/scrollTo";
import {
  CarouselContext,
  CarouselContextHTMLNode,
  CarouselContextRefCallback,
} from "./Carousel.Context";

type CarouselProviderProps = {
  children: ReactNode;

  /**
   * Отступ у элемента с одной стороны
   *
   * @default 0
   */
  itemMargin?: number;

  /**
   * @default false
   */
  isResponsiveWidthsChildren?: boolean;
};

export const CarouselProvider: FC<CarouselProviderProps> = ({
  children,
  itemMargin = 0,
  isResponsiveWidthsChildren = false,
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

  const recalculateOffsetWidth = useCallback(() => {
    init();

    const root = rootRef.current;
    const itemWidthAccASC = itemWidthAccumulatedASC.current;

    scroll.current = itemWidthAccASC[indexOfVisibleElement.current];
    scrollTo(root, { left: scroll.current, behavior: "auto" });
  }, [init]);

  // Провоцирует пересчет прямого и обратного массива смещений
  useEffect(() => {
    if (!isResponsiveWidthsChildren) return undefined;

    window.addEventListener("resize", recalculateOffsetWidth);
    return () => {
      window.removeEventListener("resize", recalculateOffsetWidth);
    };
  }, [isResponsiveWidthsChildren, recalculateOffsetWidth]);

  const rootRefCallback = useCallback<CarouselContextRefCallback>((node) => {
    rootRef.current = node;

    const itemWidthAccASC = itemWidthAccumulatedASC.current;

    scroll.current = itemWidthAccASC[indexOfVisibleElement.current];
    scrollTo(node, { left: scroll.current, behavior: "auto" });
  }, []);

  const itemListRefCallback = useCallback<CarouselContextRefCallback>(
    (node) => {
      itemListRef.current = node?.childNodes as NodeListOf<HTMLElement>;
      init();
    },
    [init],
  );

  const value = useMemo(
    () => ({
      rootRef,
      rootRefCallback,
      itemListRef,
      itemListRefCallback,
      leftSideNodeRef,
      rightSideNodeRef,
      scroll,
      indexOfVisibleElement,
      itemMargin,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
    }),
    [itemListRefCallback, rootRefCallback, itemMargin],
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
