import { useCallback, useRef, useState } from "react";

const InfiniteScrolling = ({ children, isLoading, hasMore, hendleLoad }) => {
  const observerRef = useRef();
  const lastNodeElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          hendleLoad();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, hendleLoad],
  );

  return <div ref={lastNodeElementRef}>{children}</div>;
};

export default InfiniteScrolling;
