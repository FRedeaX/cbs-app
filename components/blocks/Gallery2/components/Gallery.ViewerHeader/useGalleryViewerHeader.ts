import { useCallback, useEffect, useState } from "react";

import { IntersectionObserverCallback } from "../../../../../helpers/frontend/hooks";
import useIntersectionObserver from "../../../../../helpers/frontend/hooks/useIntersectionObserver";
import { useCarouselContext } from "../../../../Carousel/Context";

export const useGalleryViewerHeader = () => {
  const { itemListRef } = useCarouselContext();

  const [index, setIndex] = useState<number>(0);
  const fn = useCallback<IntersectionObserverCallback>((entry) => {
    if (entry[0].isIntersecting) {
      const target = entry[0].target as HTMLDivElement;
      setIndex(Math.round(target.offsetLeft / target.offsetWidth));
    }
  }, []);
  const [ref] = useIntersectionObserver({ threshold: 0.1 }, fn);

  useEffect(() => {
    if (itemListRef.current !== undefined) {
      ref(itemListRef.current);
    }
  }, [itemListRef, ref]);

  return index;
};
