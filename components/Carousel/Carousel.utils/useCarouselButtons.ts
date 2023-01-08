import { useCallback } from "react";
import { isBrowser } from "react-device-detect";

import { useTrackVisibility } from "../../../helpers/frontend/hooks/useTrackVisibility";
import { useCarouselContext } from "../Context";
import { getNextScroll } from "./getNextScroll";
import { getPrevScroll } from "./getPrevScroll";
import { offsetSides } from "./offsetSides";

export type useCarouselButtonsHandleOnClick = (
  direction: "next" | "prev",
) => void;

export const useCarouselButtons = () => {
  const {
    rootRef,
    leftSideNodeRef,
    rightSideNodeRef,
    scroll,
    itemMargin,
    itemWidthAccumulatedASC,
    itemWidthAccumulatedDESC,
  } = useCarouselContext();

  const { isVisible: isPrev } = useTrackVisibility(leftSideNodeRef.current, {
    root: rootRef.current,
  });
  const { isVisible: isNext } = useTrackVisibility(rightSideNodeRef.current, {
    root: rootRef.current,
  });

  /**
   * В зависимости от направления прокручивает контейнер
   */
  const handleOnClick = useCallback<useCarouselButtonsHandleOnClick>(
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

      const nodeSum = Math.abs(currentScroll - scroll.current);

      root.scrollTo({
        left: scroll.current - offsetSides(containerWidth, nodeSum, itemMargin),
        behavior: "smooth",
      });
    },
    [
      rootRef,
      scroll,
      itemMargin,
      itemWidthAccumulatedASC,
      itemWidthAccumulatedDESC,
    ],
  );

  return {
    isPrev: !isPrev && isBrowser,
    isNext: !isNext && isBrowser,
    handleOnClick,
  };
};
