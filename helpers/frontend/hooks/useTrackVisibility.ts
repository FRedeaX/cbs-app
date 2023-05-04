import { useState } from "react";

import { Maybe } from "../../typings/utility-types";
import useIntersectionObserver, {
  IntersectionObserverHookArgs,
  IntersectionObserverHookResult,
} from "./useIntersectionObserver";

export type TrackVisibilityHookArgs = IntersectionObserverHookArgs;

export type TrackVisibilityHookResult = [
  IntersectionObserverHookResult[0],
  IntersectionObserverHookResult[1] & {
    isVisible: Maybe<boolean>;
    wasEverVisible: Maybe<boolean>;
  },
];

export const useTrackVisibility = (
  args?: IntersectionObserverHookArgs,
): TrackVisibilityHookResult => {
  const [ref, result] = useIntersectionObserver(args);
  const isVisible = result.entryList?.[0].isIntersecting;
  const [wasEverVisible, setWasEverVisible] = useState(isVisible);

  if (isVisible && !wasEverVisible) {
    setWasEverVisible(true);
  }

  return [ref, { ...result, isVisible, wasEverVisible }];
};
