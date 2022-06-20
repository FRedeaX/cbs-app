import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";
import { localStorage } from "../../helpers";
import useIntersectionObserver, {
  IntersectionObserverHookRefCallback,
} from "../../helpers/frontend/hooks/useIntersectionObserver";

interface IArgs {
  length: number;
  itemWidth: number;
  itemMargin: number;
  isOffsetSides: boolean;
  id: string;
}

interface IItemCountOfScreen {
  isIntersecting: boolean;
  offsetLeft: number;
  offsetWidth: number;
}

interface ISaveScrolled {
  [key: string]: number;
}

export type useCarusel2HookOnClickHendler = (
  direction: "next" | "prev",
) => void;
export type useCarusel2HookOnKeyDownHendler = (
  event: KeyboardEvent<HTMLAnchorElement> | KeyboardEvent<HTMLDivElement>,
) => void;
type useCarusel2HookRootRefCallback = (rootNode: HTMLDivElement | null) => void;

type useCarusel2HookResult = [
  IntersectionObserverHookRefCallback,
  {
    onClickHendler: useCarusel2HookOnClickHendler;
    onKeyDownHendler: useCarusel2HookOnKeyDownHendler;
    rootRefCallback: useCarusel2HookRootRefCallback;
    isPrev: boolean;
    isNext: boolean;
    isDisplayNavigation: boolean;
  },
];

/**
 * 1. Учитываем правй отступ "offsetLeft"
 * (itemMargin * OFFSET_LEFT_MARGIN)
 *
 * 2. Рассчитываем полный отступ
 * (itemMargin * FULL_MARGIN)
 */
const OFFSET_LEFT_MARGIN = 2; /* 1. */
const FULL_MARGIN = 2; /* 2. */
const SAVE_SCROLLED = "saveScrolled";

export default function useCarusel2(args: IArgs): useCarusel2HookResult {
  const [isPrev, setPrev] = useState(false);
  const [isNext, setNext] = useState(true);
  const [isDisplayNavigation, setDisplayNavigation] = useState(false);
  const rootWidth = useRef<number>(0);
  const alreadyScrolled = useRef<number>(0);
  const itemCountOfScreen = useRef<IItemCountOfScreen[]>([]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const parentNode = entries[0].target.parentNode?.parentNode;
      if (parentNode instanceof HTMLElement) {
        rootWidth.current = parentNode.clientWidth;
      }

      entries.forEach(({ isIntersecting, target }) => {
        const { offsetLeft, offsetWidth } = target as HTMLElement;
        const count = Math.round((offsetLeft + offsetWidth) / offsetWidth);

        itemCountOfScreen.current[args.length - count] = {
          isIntersecting,
          offsetLeft,
          offsetWidth,
        };

        itemCountOfScreen.current.forEach((node) => {
          if (node.isIntersecting) {
            const cstScrollTo = node.offsetLeft - args.itemMargin * FULL_MARGIN;
            alreadyScrolled.current = cstScrollTo;
          }
        });

        if (isIntersecting) {
          setPrev(
            !itemCountOfScreen.current[itemCountOfScreen.current.length - 1]
              ?.isIntersecting,
          );
          setNext(!itemCountOfScreen.current[0]?.isIntersecting);
        }
      });

      if (!isDisplayNavigation && isBrowser) {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        setDisplayNavigation(intersecting.length < args.length && isBrowser);
      }
    },
    [args.itemMargin, args.length, isDisplayNavigation],
  );

  const [
    nodeListRefCallbackObserver,
    { rootRefCallback: rootRefCallbackObserver },
  ] = useIntersectionObserver(
    {
      threshold: 0.95,
    },
    observerCallback,
  );

  const rootRef = useRef<HTMLDivElement | null>(null);

  const setScroll = useCallback((left: number) => {
    if (rootRef.current === null) return;
    alreadyScrolled.current = left;

    rootRef.current.scrollTo({
      left,
      behavior: "smooth",
    });
  }, []);

  const onClickHendler = useCallback<useCarusel2HookOnClickHendler>(
    async (direction) => {
      if (direction === "prev") {
        const scrollTo = itemCountOfScreen.current.reduce(
          (acc, { isIntersecting, offsetWidth }) =>
            acc -
            (isIntersecting
              ? offsetWidth + args.itemMargin * FULL_MARGIN * OFFSET_LEFT_MARGIN
              : 0),
          alreadyScrolled.current,
        );

        setScroll(scrollTo < 0 ? 0 : scrollTo);
      } else if (direction === "next") {
        const nodeSum = itemCountOfScreen.current.reduce(
          (acc, { isIntersecting, offsetWidth }) =>
            acc +
            (isIntersecting ? offsetWidth + args.itemMargin * FULL_MARGIN : 0),
          0,
        );

        const offsetSides = (rootWidth.current - nodeSum) / 2 - args.itemMargin;
        const newValue = args.isOffsetSides ? nodeSum - offsetSides : nodeSum;

        const scrollTo = alreadyScrolled.current + newValue;
        const maxOffsetLeft =
          itemCountOfScreen.current[0].offsetLeft -
          args.itemMargin * FULL_MARGIN;

        setScroll(scrollTo > maxOffsetLeft ? maxOffsetLeft : scrollTo);
      }
    },
    [args.isOffsetSides, args.itemMargin, setScroll],
  );

  const onKeyDownHendler = useCallback<useCarusel2HookOnKeyDownHendler>(
    ({ code }) => {
      if (code === "ArrowRight" || code === "KeyD") onClickHendler("next");
      if (code === "ArrowLeft" || code === "KeyA") onClickHendler("prev");
    },
    [onClickHendler],
  );

  const saveScrolled = useCallback(
    async (id: string, carrentScroll: number) => {
      localStorage.get<ISaveScrolled>(SAVE_SCROLLED).then((storage) => {
        console.log(id, carrentScroll, "_saveScrolled_: ", storage);

        const scroll: ISaveScrolled = {
          ...storage,
          [id]: carrentScroll,
        };
        localStorage.set(SAVE_SCROLLED, scroll);
      });
    },
    [],
  );

  useEffect(
    () => () => {
      console.log("!!!");

      saveScrolled(args.id, alreadyScrolled.current);
    },
    [args.id, saveScrolled],
  );

  const restoringScroll = useCallback(async () => {
    const storage = await localStorage.get<ISaveScrolled>(SAVE_SCROLLED);
    // console.log(args.id, "storage", storage);
    console.log("restoringScroll", alreadyScrolled.current);

    setScroll(storage?.[args.id] ?? 0);

    console.log("setRestoringScroll", alreadyScrolled.current);
  }, [args.id, setScroll]);

  console.log(alreadyScrolled.current);

  const rootRefCallback = useCallback<useCarusel2HookRootRefCallback>(
    (rootNode) => {
      rootRef.current = rootNode;
      rootRefCallbackObserver(rootNode);
    },
    [rootRefCallbackObserver],
  );

  const nodeListRefCallback = useCallback(
    (rootNode) => {
      nodeListRefCallbackObserver(rootNode);
      restoringScroll();
    },
    [nodeListRefCallbackObserver, restoringScroll],
  );

  return [
    nodeListRefCallback,
    {
      onClickHendler,
      onKeyDownHendler,
      rootRefCallback,
      isPrev,
      isNext,
      isDisplayNavigation,
    },
  ];
}
