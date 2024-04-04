"use client";

import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { exceptionLog } from "../../../helpers";
import { fillOffsetArray } from "../Carousel.utils/fillOffsetArray";
import { offsetSides } from "../Carousel.utils/offsetSides";
import { scrollTo } from "../Carousel.utils/scrollTo";

import {
  CarouselContext,
  CarouselContextHTMLNode,
  CarouselContextItemListRef,
  CarouselContextProps,
  CarouselContextRefCallback,
} from "./Carousel.Context";

export type CarouselProviderProps = {
  children: ReactNode;

  /**
   * @default false
   */
  isResponsiveWidthsChildren?: boolean;

  /**
   * Пропускает указанное количество элементов.
   */
  skip?: number;
} & Partial<Pick<CarouselContextProps, "itemMargin" | "typeMovement">>;

export const CarouselProvider: FC<CarouselProviderProps> = ({
  children,
  itemMargin = 0,
  typeMovement = "scroll",
  isResponsiveWidthsChildren = false,
  skip,
}) => {
  const rootRef = useRef<CarouselContextHTMLNode>(null);
  const itemListRef = useRef<CarouselContextItemListRef>(undefined);

  const scroll = useRef(0);
  const indexOfVisibleElement = useRef(skip ?? 0);
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
    scroll.current = itemWidthAccASC[indexOfVisibleElement.current] ?? 0;

    if (root) {
      scrollTo(root, { left: scroll.current, behavior: "auto", typeMovement });
    }
  }, [init, typeMovement]);

  // Провоцирует пересчет прямого и обратного массива смещений
  useEffect(() => {
    if (!isResponsiveWidthsChildren) return undefined;

    window.addEventListener("resize", recalculateOffsetWidth);
    return () => {
      window.removeEventListener("resize", recalculateOffsetWidth);
    };
  }, [isResponsiveWidthsChildren, recalculateOffsetWidth]);

  const rootRefCallback = useCallback<CarouselContextRefCallback>(
    (node) => {
      if (node === null) return;
      rootRef.current = node;

      if (indexOfVisibleElement.current === 0) return;

      const currentScroll = scroll.current;
      const containerWidth = node.clientWidth + Math.abs(itemMargin);
      const itemWidthAccASC = itemWidthAccumulatedASC.current;

      scroll.current = itemWidthAccASC[indexOfVisibleElement.current];
      const offset = offsetSides(
        containerWidth,
        currentScroll,
        scroll.current,
        Math.max(itemMargin, 0),
      );

      try {
        scrollTo(node, {
          left: scroll.current - offset,
          behavior: "auto",
          typeMovement,
        });
      } catch (error) {
        exceptionLog(error);
      }
    },
    [itemMargin, typeMovement],
  );

  const itemListRefCallback = useCallback<CarouselContextRefCallback>(
    (node) => {
      if (node !== null && node.childNodes !== undefined) {
        itemListRef.current = Array.prototype.slice.call(node.children || []);
        init();
      }
    },
    [init],
  );

  const value = useMemo(
    () => ({
      rootRef,
      rootRefCallback,
      itemListRef,
      itemListRefCallback,
      scroll,
      indexOfVisibleElement,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
      itemMargin,
      typeMovement,
    }),
    [itemListRefCallback, rootRefCallback, itemMargin, typeMovement],
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
