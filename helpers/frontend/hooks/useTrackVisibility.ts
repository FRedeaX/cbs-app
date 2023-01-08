/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useRef, useState } from "react";

import { Nullable } from "../../typings/utility-types";
import isIntersection from "../isIntersection";

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = [0];

type TrackVisibilityInit = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type TrackVisibilityHookTarget = Nullable<Element>;
type TrackVisibilityHookArgs = TrackVisibilityInit;

type TrackVisibilityHookResult = {
  entry: IntersectionObserverEntry | undefined;
  isVisible: boolean;
};

export const useTrackVisibility = (
  target: TrackVisibilityHookTarget,
  args?: TrackVisibilityHookArgs,
): TrackVisibilityHookResult => {
  const rootMargin = args?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = args?.threshold ?? DEFAULT_THRESHOLD;
  const root = args?.root ?? null;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const isVisible = Boolean(entry?.isIntersecting);

  const unobserve = useCallback(() => {
    const currentObserver = observerRef.current;
    currentObserver?.disconnect();
    observerRef.current = null;
  }, []);

  const observe = useCallback(() => {
    if (target) {
      const options = { root, rootMargin, threshold };

      const observer = new IntersectionObserver(([newEntry]) => {
        setEntry(newEntry);
      }, options);
      observer.observe(target);
      observerRef.current = observer;
    }
  }, [target, root, rootMargin, threshold]);

  const initializeObserver = useCallback(() => {
    if (!isIntersection) return;
    unobserve();
    observe();
  }, [observe, unobserve]);

  useEffect(() => {
    initializeObserver();
    return () => {
      unobserve();
    };
  }, [initializeObserver, unobserve]);

  return { entry, isVisible };
};
