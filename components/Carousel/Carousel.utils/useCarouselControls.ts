import { useEffect } from "react";
import { isDesktop } from "react-device-detect";

import { useTrackVisibility } from "../../../helpers/frontend/hooks/useTrackVisibility";
import { useCarouselContext } from "../Context";

export const useCarouselControls = () => {
  const { rootRef, itemListRef } = useCarouselContext();

  const [leftSideNodeRef, { isVisible: isPrev, rootRef: rootRefLeft }] =
    useTrackVisibility({ threshold: 0.9 });
  const [rightSideNodeRef, { isVisible: isNext, rootRef: rootRefRight }] =
    useTrackVisibility({ threshold: 0.9 });

  useEffect(() => {
    if (itemListRef.current !== undefined) {
      leftSideNodeRef(itemListRef.current[0]);
      rightSideNodeRef(itemListRef.current[itemListRef.current.length - 1]);

      rootRefLeft(rootRef.current);
      rootRefRight(rootRef.current);
    }
  }, [
    itemListRef,
    leftSideNodeRef,
    rightSideNodeRef,
    rootRef,
    rootRefLeft,
    rootRefRight,
  ]);

  return {
    isPrev: isPrev === undefined ? !!isPrev : !isPrev && isDesktop,
    isNext: isNext === undefined ? !!isNext : !isNext && isDesktop,
  };
};
