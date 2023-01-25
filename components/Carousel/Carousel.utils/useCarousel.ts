import { TouchEvent, WheelEvent, useCallback } from "react";

import { useCarouselContext } from "../Context";
import { getNextScroll } from "./getNextScroll";
import { getPrevScroll } from "./getPrevScroll";
import { offsetSides } from "./offsetSides";

export type useCarouselHandleOnClick = (direction: "next" | "prev") => void;

export type useCarouselHandleOnScroll = (
  event: TouchEvent<HTMLDivElement> | WheelEvent<HTMLDivElement>,
) => void;

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
   * В зависимости от направления прокручивает контейнер
   */
  const handleOnClick = useCallback<useCarouselHandleOnClick>(
    (direction) => {
      if (rootRef.current === null) return;

      const root = rootRef.current;
      const currentScroll = scroll.current;
      const itemWidthAccACS = itemWidthAccumulatedASC.current;
      const itemWidthAccDESC = itemWidthAccumulatedDESC.current;

      const containerWidth = root.clientWidth;

      if (direction === "next") {
        scroll.current = getNextScroll(
          itemWidthAccDESC,
          currentScroll,
          containerWidth,
        );
      } else if (direction === "prev") {
        scroll.current = getPrevScroll(
          itemWidthAccACS,
          currentScroll,
          containerWidth,
        );
      }

      indexOfVisibleElement.current += 1;
      const nodeSum = Math.abs(currentScroll - scroll.current);

      root.scrollTo({
        left: scroll.current - offsetSides(containerWidth, nodeSum, itemMargin),
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
    handleOnClick,
    handleOnScroll,
  };
};
