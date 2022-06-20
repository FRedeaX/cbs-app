import { KeyboardEvent, useCallback, useRef, useState } from "react";
import useIntersectionObserver, {
  IntersectionObserverHookRefCallback,
} from "../../helpers/frontend/hooks/useIntersectionObserver";

interface IArgs {
  length: number;
  itemWidth: number;
  itemCountOfScreen: number;
}

type useCarusel2HookOnClickHendler = (direction: "next" | "prev") => void;
type useCarusel2HookOnKeyDownHendler = (
  event: KeyboardEvent<HTMLDivElement>,
) => void;
type useCarusel2HookRootRefCallback = (rootNode: HTMLDivElement | null) => void;

type useCarusel2HookResult = [
  IntersectionObserverHookRefCallback,
  {
    onClickHendler: useCarusel2HookOnClickHendler;
    onKeyDownHendler: useCarusel2HookOnKeyDownHendler;
    onWellHendler: () => void;
    rootRefCallback: useCarusel2HookRootRefCallback;
    isPrev: boolean;
    isNext: boolean;
  },
];

/* eslint-disable no-console */
export default function useCarusel2(args: IArgs): useCarusel2HookResult {
  const [isPrev, setPrev] = useState(false);
  const [isNext, setNext] = useState(true);
  const alreadyScrolled = useRef<number>(0);
  const itemWidth = useRef<number | null>(args.itemWidth ?? null);
  const itemCountOfScreen = useRef<number | null>(
    args.itemCountOfScreen ?? null,
  );

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          // const entryTarget: HTMLDivElement = entry.target;
          const { offsetLeft, offsetWidth } = entry.target;
          alreadyScrolled.current = offsetLeft;
          const count = (offsetLeft + offsetWidth) / offsetWidth;
          console.log({ count });
          console.log(entry);

          setPrev(count !== 1);
          setNext(count !== args.length);
        }
      });
    },
    [args.length],
  );

  const [nodeListRefCallback, { rootRefCallback: rootRefCallbackObserver }] =
    useIntersectionObserver(
      {
        threshold: [0.95],
      },
      observerCallback,
    );

  const rootRef = useRef<HTMLDivElement | null>(null);

  const getItemWidth = useCallback(() => {
    if (rootRef.current === null) return null;

    const node = rootRef.current?.childNodes?.[0].childNodes?.[1];
    if (!(node instanceof HTMLElement)) return null;

    return node.offsetWidth;
  }, []);

  const getItemCountOfScreen = useCallback(() => {
    if (!rootRef.current || itemWidth === null) return null;

    return Math.max(Math.floor(rootRef.current.offsetWidth / itemWidth), 1);
  }, [itemWidth]);

  const onClickHendler = useCallback<useCarusel2HookOnClickHendler>(
    (direction) => {
      if (
        rootRef.current === null ||
        itemWidth.current === null ||
        itemCountOfScreen.current === null
      )
        return;

      const scrollTo = itemWidth.current * itemCountOfScreen.current;

      if (direction === "prev" && isPrev) {
        alreadyScrolled.current -= scrollTo;
      } else if (direction === "next" && isNext) {
        alreadyScrolled.current += scrollTo;
      }

      rootRef.current.scroll({
        left: alreadyScrolled.current,
        behavior: "smooth",
      });
    },
    [isNext, isPrev],
  );

  const onKeyDownHendler = useCallback<useCarusel2HookOnKeyDownHendler>(
    ({ key }) => {
      console.log(key);
      // rus (ф, а)?
      if (key === "ArrowRight" || key === "d") onClickHendler("next");
      if (key === "ArrowLeft" || key === "a") onClickHendler("prev");
    },
    [onClickHendler],
  );

  const onWellHendler = useCallback(() => {
    console.log();
  }, []);

  const rootRefCallback = useCallback<useCarusel2HookRootRefCallback>(
    (rootNode) => {
      rootRef.current = rootNode;
      rootRefCallbackObserver(rootNode);

      // init
      if (itemWidth.current === null) itemWidth.current = getItemWidth();
      if (itemCountOfScreen.current === null)
        itemCountOfScreen.current = getItemCountOfScreen();
    },
    [getItemCountOfScreen, getItemWidth, rootRefCallbackObserver],
  );

  return [
    nodeListRefCallback,
    {
      onClickHendler,
      onKeyDownHendler,
      onWellHendler,
      rootRefCallback,
      isPrev,
      isNext,
    },
  ];
}
