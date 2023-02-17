import { WheelEvent, useCallback } from "react";

import { useCarouselContext } from "../Context";
import { getNextScroll } from "./getNextScroll";
import { getPrevScroll } from "./getPrevScroll";
import { offsetSides } from "./offsetSides";
import { scrollTo } from "./scrollTo";

export type useCarouselHandleOnClick = (direction: "next" | "prev") => void;

export type useCarouselHandleOnScroll = (
  event: WheelEvent<HTMLDivElement>,
) => void;

type useCarouselScrollToIndex = (index: number) => void;

export const useCarousel = () => {
  const {
    rootRef,
    scroll,
    indexOfVisibleElement,
    itemMargin,
    itemWidthAccumulatedASC,
    itemWidthAccumulatedDESC,
  } = useCarouselContext();

  /**
   * Прокручивает контейнер к элементу
   */
  const scrollToIndex = useCallback<useCarouselScrollToIndex>(
    (index) => {
      const root = rootRef.current;
      const itemWidthAccASC = itemWidthAccumulatedASC.current;

      indexOfVisibleElement.current = index;
      scroll.current = itemWidthAccASC[index];
      scrollTo(root, { left: scroll.current, behavior: "auto" });
    },
    [indexOfVisibleElement, itemWidthAccumulatedASC, rootRef, scroll],
  );

  /**
   * В зависимости от направления прокручивает контейнер
   */
  const containerMovement = useCallback<useCarouselHandleOnClick>(
    (direction) => {
      const root = rootRef.current;
      if (root === null) return;

      const currentScroll = scroll.current;
      const itemWidthAccACS = itemWidthAccumulatedASC.current;
      const itemWidthAccDESC = itemWidthAccumulatedDESC.current;
      const containerWidth = root.clientWidth + Math.abs(itemMargin);

      if (direction === "next") {
        const index = getNextScroll(
          itemWidthAccDESC,
          currentScroll,
          containerWidth,
        );
        scroll.current = itemWidthAccDESC[index];
        indexOfVisibleElement.current = itemWidthAccDESC.length - 1 - index;
      } else if (direction === "prev") {
        const index = getPrevScroll(
          itemWidthAccACS,
          currentScroll,
          containerWidth,
        );
        scroll.current = itemWidthAccACS[index];
        indexOfVisibleElement.current = index;
      }

      const isItemFullWidth = scroll.current % containerWidth;
      // если следующий элемент занимает всю ширину экрана nodeSum не рассчитываем
      const nodeSum =
        isItemFullWidth && Math.abs(currentScroll - scroll.current);

      scrollTo(root, {
        left:
          scroll.current -
          offsetSides(containerWidth, nodeSum, Math.max(itemMargin, 0)),
        behavior: "smooth",
      });
    },
    [
      rootRef,
      scroll,
      indexOfVisibleElement,
      itemMargin,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
    ],
  );

  /**
   * Синхронизирует положение прокрутки `DOM` с локальным значением,
   * т.к. `onClick` для возможности прокрутить еще
   * в момент анимации использует локальное значение
   */
  const handleOnScroll = useCallback<useCarouselHandleOnScroll>(
    (event) => {
      scroll.current = event.currentTarget.scrollLeft;
    },
    [scroll],
  );

  return {
    scrollToIndex,
    containerMovement,
    handleOnScroll,
  };
};
