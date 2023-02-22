import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { Maybe } from "../../../helpers/typings/utility-types";
import { fillOffsetArray } from "../Carousel.utils/fillOffsetArray";
import { scrollTo } from "../Carousel.utils/scrollTo";
import {
  CarouselContext,
  CarouselContextHTMLNode,
  CarouselContextProps,
  CarouselContextRefCallback,
} from "./Carousel.Context";

export type CarouselProviderProps = {
  children: ReactNode;

  /**
   * @default false
   */
  isResponsiveWidthsChildren?: boolean;
} & Partial<Pick<CarouselContextProps, "itemMargin" | "typeMovement">>;

export const CarouselProvider: FC<CarouselProviderProps> = ({
  children,
  itemMargin = 0,
  typeMovement = "scroll",
  isResponsiveWidthsChildren = false,
}) => {
  const rootRef = useRef<CarouselContextHTMLNode>(null);
  const itemListRef = useRef<Maybe<HTMLElement[]>>(undefined);

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

    if (root) {
      scrollTo(root, { left: scroll.current, typeMovement, scrollTime: 0 });
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
      const itemWidthAccASC = itemWidthAccumulatedASC.current;
      scroll.current = itemWidthAccASC[indexOfVisibleElement.current];

      scrollTo(node, { left: scroll.current, behavior: "auto", typeMovement });
    },
    [typeMovement],
  );

  const itemListRefCallback = useCallback<CarouselContextRefCallback>(
    (node) => {
      if (node !== null && node.childNodes !== undefined) {
        itemListRef.current = Array.from(
          (node.children as HTMLElement[]) || [],
        );
        init();
      }

      // itemListRef.current = node?.childNodes as NodeListOf<HTMLElement>;
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
