import { useEffect, useRef } from "react";

import useIntersectionObserver from "../../../../../helpers/frontend/hooks/useIntersectionObserver";
import { useCarouselContext } from "../../../../Carousel/Context";

export const useGalleryViewerHeader = () => {
  const { itemListRef } = useCarouselContext();
  const index = useRef(0);
  const [ref, { entry }] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (itemListRef.current !== undefined) {
      ref(itemListRef.current);
    }
  }, [itemListRef, ref]);

  if (entry !== undefined && entry.isIntersecting) {
    const target = entry.target as HTMLDivElement;
    index.current = Math.round(target.offsetLeft / target.offsetWidth);
  }

  return index.current;
};
