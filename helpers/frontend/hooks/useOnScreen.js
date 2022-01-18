import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { isFront } from "../..";

const isIntersection =
  isFront &&
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

export default function useOnScreen(ref, rootMargin = "0px", threshold = 0) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (isIntersection) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setIsOnScreen(entry.isIntersecting),
        {
          rootMargin,
          threshold,
        },
      );
    }
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (isIntersection) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (isIntersection) {
        observerRef.current.disconnect();
      }
    };
  }, [ref]);

  return { isOnScreen };
}

useOnScreen.propTypes = {
  ref: PropTypes.element,
  rootMargin: PropTypes.string,
  threshold: PropTypes.number,
};
