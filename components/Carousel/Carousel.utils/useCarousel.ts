import { WheelEvent, useCallback } from "react";

import { useCarouselContext } from "../Context";
import { getNextScroll } from "./getNextScroll";
import { getPrevScroll } from "./getPrevScroll";
import { offsetSides } from "./offsetSides";
import { scrollTo } from "./scrollTo";

export type useCarouselHandleOnClick = (
  direction: "next" | "prev",
  scrollTime?: number,
) => void;

export type useCarouselHandleOnScroll = (
  event: WheelEvent<HTMLDivElement>,
) => void;

type useCarouselScrollToIndex = (index: number) => void;

export const useCarousel = () => {
  const {
    rootRef,
    scroll,
    indexOfVisibleElement,
    itemWidthAccumulatedASC,
    itemWidthAccumulatedDESC,
    itemMargin,
    typeMovement,
  } = useCarouselContext();

  /**
   * Прокручивает контейнер к элементу
   */
  const scrollToIndex = useCallback<useCarouselScrollToIndex>(
    (index) => {
      indexOfVisibleElement.current = index;

      const root = rootRef.current;
      if (root === null) return;

      const currentScroll = scroll.current;
      const itemWidthAccASC = itemWidthAccumulatedASC.current;
      const containerWidth = root.clientWidth + Math.abs(itemMargin);

      scroll.current = itemWidthAccASC[index];
      const offset = offsetSides(
        containerWidth,
        currentScroll,
        scroll.current,
        Math.max(itemMargin, 0),
      );

      scrollTo(root, {
        left: scroll.current - offset,
        behavior: "auto",
        typeMovement,
      });
    },
    [
      rootRef,
      scroll,
      itemWidthAccumulatedASC,
      itemMargin,
      indexOfVisibleElement,
      typeMovement,
    ],
  );

  /**
   * В зависимости от направления рассчитывает позицию `scroll` и
   * прокручивает контейнер.
   */
  const containerMovement = useCallback<useCarouselHandleOnClick>(
    (direction, scrollTime) => {
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

      const offset = offsetSides(
        containerWidth,
        currentScroll,
        scroll.current,
        Math.max(itemMargin, 0),
      );

      scrollTo(root, {
        left: scroll.current - offset,
        behavior: "smooth",
        typeMovement,
        scrollTime,
      });
    },
    [
      rootRef,
      scroll,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
      itemMargin,
      typeMovement,
      indexOfVisibleElement,
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
