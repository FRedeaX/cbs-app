import { ReactNode, useCallback, useMemo, useState } from "react";
import useIntersectionObserver from "../../helpers/frontend/hooks/useIntersectionObserver";

interface IArgs {
  itemWidth?: number;
  itemCountOfScreen?: number;
}

/* eslint-disable no-console */
export default function useCarusel2(args: IArgs) {
  const [nodeListRef, { rootRef: scrolledRef }] = useIntersectionObserver({});

  // const scrolledRef = useRef<HTMLDivElement | null>(null);
  const [alreadyScrolled, setAlreadyScrolled] = useState<number>(0);

  const itemWidth = useMemo<number | null>(() => {
    if (args?.itemWidth) return args.itemWidth;

    if (scrolledRef.current === null) return null;
    const node = scrolledRef.current?.childNodes?.[0].childNodes?.[1];
    if (node instanceof HTMLElement) {
      return node.offsetWidth;
    }

    return null;
  }, [args.itemWidth, scrolledRef]);

  const itemCountOfScreen = useMemo<number | null>(() => {
    if (args?.itemCountOfScreen) return args.itemCountOfScreen;

    if (scrolledRef.current === null) return null;
    if (itemWidth !== null) {
      return Math.max(
        Math.floor(scrolledRef.current.offsetWidth / itemWidth),
        1,
      );
    }

    return null;
  }, [args.itemCountOfScreen, itemWidth, scrolledRef]);

  const rootRefCallback = useCallback(
    (node: ReactNode) => {
      // console.log("!", node);

      scrolledRef.current = node;
    },
    [scrolledRef],
  );

  // useEffect(() => {
  //   console.log(alreadyScrolled);
  // }, [alreadyScrolled]);

  const onClickHendler = useCallback(
    (direction: "next" | "prev"): void => {
      if (
        scrolledRef.current === null ||
        itemWidth === null ||
        itemCountOfScreen === null
      )
        return;

      let nextScrollPos = alreadyScrolled;
      const scrollTo = itemWidth * itemCountOfScreen;

      if (direction === "next") {
        nextScrollPos += scrollTo;
      } else if (direction === "prev") {
        nextScrollPos -= scrollTo;
        if (nextScrollPos < 0) nextScrollPos = 0;
      }

      setAlreadyScrolled(nextScrollPos);
      scrolledRef.current.scroll({
        left: nextScrollPos,
        behavior: "smooth",
      });
    },
    [alreadyScrolled, itemCountOfScreen, itemWidth, scrolledRef],
  );

  const onKeyDownHendler = ({ key }: any) => {
    if (key === "ArrowRight" || key === "d") onClickHendler("next");
    if (key === "ArrowLeft" || key === "a") onClickHendler("prev");
  };

  const onWellHendler = useCallback(() => {
    console.log();
  }, []);

  return [
    rootRefCallback,
    nodeListRef,
    { onClickHendler, onKeyDownHendler, onWellHendler },
  ];
}
