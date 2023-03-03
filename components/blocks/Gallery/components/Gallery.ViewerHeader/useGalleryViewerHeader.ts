import { useEffect, useRef } from "react";

import useIntersectionObserver from "../../../../../helpers/frontend/hooks/useIntersectionObserver";
import { Nullable } from "../../../../../helpers/typings/utility-types";
import { useCarouselContext } from "../../../../Carousel/context";

export const useGalleryViewerHeader = () => {
  const { itemListRef } = useCarouselContext();
  const index = useRef<Nullable<number>>(null);
  const [ref, { entryList }] = useIntersectionObserver({
    threshold: 0.45,
  });

  useEffect(() => {
    if (itemListRef.current !== undefined) {
      ref(itemListRef.current);
    }
  }, [itemListRef, ref]);

  if (entryList !== undefined) {
    entryList.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLDivElement;
        index.current = Math.round(target.offsetLeft / target.offsetWidth);
      }
    });
  }

  return index.current;
};
