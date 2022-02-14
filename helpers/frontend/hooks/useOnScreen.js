/* eslint-disable import/no-cycle */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { isIntersection } from "..";

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
    if (isIntersection && ref && ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (isIntersection) {
        observerRef.current.disconnect(); // unobserve
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
