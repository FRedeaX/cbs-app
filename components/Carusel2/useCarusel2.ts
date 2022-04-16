import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../helpers/frontend/hooks/useIntersectionObserver";

interface IArgs {
  itemWidth?: number;
  itemCountOfScreen?: number;
}

/* eslint-disable no-console */
export default function useCarusel2(args: IArgs): any {
  const [nodeListRef, { rootRef: scrolledRef }] = useIntersectionObserver({});

  // const scrolledRef = useRef<HTMLDivElement | null>(null);
  const [alreadyScrolled, setAlreadyScrolled] = useState<number>(0);

  const itemWidth = useRef<number | undefined>(args?.itemWidth);
  const itemCountOfScreen = useRef<number | undefined>(args?.itemCountOfScreen);

  const initVariable = useCallback((): void => {
    if (scrolledRef.current === null) return;

    // вычисление itemWidth
    if (itemWidth.current === undefined) {
      const figure = scrolledRef.current?.childNodes?.[0].childNodes?.[1];

      if (figure instanceof HTMLElement) {
        itemWidth.current = figure.offsetWidth;
      }
    }

    // вычисление itemCountOfScreen
    if (
      itemCountOfScreen.current === undefined &&
      itemWidth.current !== undefined
    ) {
      console.log(scrolledRef.current.offsetWidth, itemWidth.current);

      itemCountOfScreen.current = Math.max(
        Math.floor(scrolledRef.current.offsetWidth / itemWidth.current),
        1,
      );
    }
  }, [scrolledRef]);

  const rootRefCallback = useCallback(
    (node) => {
      console.log("!", node);

      scrolledRef.current = node;
      initVariable();
    },
    [initVariable, scrolledRef],
  );

  // useEffect(() => {
  //   console.log(alreadyScrolled);
  // }, [alreadyScrolled]);

  const onClickHendler = useCallback(
    (direction: "next" | "prev"): void => {
      if (
        scrolledRef.current === null ||
        itemWidth.current === undefined ||
        itemCountOfScreen.current === undefined
      )
        return;

      let nextScrollPos = alreadyScrolled;
      const scrollTo = itemWidth.current * itemCountOfScreen.current;

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
    [alreadyScrolled, scrolledRef],
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
