import { useEffect, useRef } from "react";

import useIntersectionObserver from "@/helpers/frontend/hooks/useIntersectionObserver";
import { Nullable } from "@/helpers/typings/utility-types";
import { useCarouselContext } from "@/components/Carousel/context";

export const useGalleryViewerHeader = () => {
  const { itemListRef } = useCarouselContext();
  const indexRef = useRef<Nullable<number>>(null);
  const [observerRef, { entryList }] = useIntersectionObserver({
    threshold: 0.45,
  });

  useEffect(() => {
    if (itemListRef.current !== undefined) {
      observerRef(itemListRef.current);
    }
  }, [itemListRef, observerRef]);

  if (entryList !== undefined) {
    entryList.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLDivElement;
        indexRef.current = Math.round(target.offsetLeft / target.offsetWidth);
      }
    });
  }

  return indexRef.current;
};
