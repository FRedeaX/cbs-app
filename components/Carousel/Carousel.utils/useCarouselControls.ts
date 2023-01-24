import { isBrowser } from "react-device-detect";

import { useTrackVisibility } from "../../../helpers/frontend/hooks/useTrackVisibility";
import { useCarouselContext } from "../Context";

export const useCarouselControls = () => {
  const { rootRef, leftSideNodeRef, rightSideNodeRef } = useCarouselContext();

  const { isVisible: isPrev } = useTrackVisibility(leftSideNodeRef.current, {
    root: rootRef.current,
  });
  const { isVisible: isNext } = useTrackVisibility(rightSideNodeRef.current, {
    root: rootRef.current,
  });

  return {
    isPrev: !isPrev && isBrowser,
    isNext: !isNext && isBrowser,
  };
};
