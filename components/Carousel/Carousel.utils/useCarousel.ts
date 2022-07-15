import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";

import { localStorage } from "../../../helpers";
import useIntersectionObserver, {
  IntersectionObserverHookRefCallback,
} from "../../../helpers/frontend/hooks/useIntersectionObserver";
import {
  FULL_MARGIN,
  OFFSET_LEFT_MARGIN,
  SAVE_SCROLLED,
} from "../Carousel.const";
import { offsetSides } from "./offsetSides";

export interface IArgs {
  length: number;
  itemMargin: number;
  isOffsetSides: boolean;
  id?: string;
  setCount?: (count: number) => void;
}

interface IItemCountOfScreen {
  isIntersecting: boolean;
  offsetLeft: number;
  offsetWidth: number;
}

interface ISaveScrolled {
  [key: string]: number;
}

export type useCarouselHookOnClickHendler = (
  direction: "next" | "prev",
) => void;
export type useCarouselHookOnKeyDownHendler = (
  event: KeyboardEvent<HTMLAnchorElement> | KeyboardEvent<HTMLDivElement>,
) => void;
export type useCarouselHookRootRefCallback = (
  rootNode: HTMLDivElement | null,
) => void;

export type useCarouselHookResult = [
  IntersectionObserverHookRefCallback,
  {
    onClickHendler: useCarouselHookOnClickHendler;
    onKeyDownHendler: useCarouselHookOnKeyDownHendler;
    rootRefCallback: useCarouselHookRootRefCallback;
    isPrev: boolean;
    isNext: boolean;
    isDisplayNavigation: boolean;
  },
];

export const useCarousel = (args: IArgs): useCarouselHookResult => {
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

        if (isIntersecting && args.setCount !== undefined) {
          args.setCount(count);
        }
      });

      itemCountOfScreen.current.forEach((node) => {
        if (node.isIntersecting) {
          const nodeSum = node.offsetLeft - args.itemMargin * FULL_MARGIN;
          // const scrollTo = args.isOffsetSides
          //   ? nodeSum - offsetSides(rootWidth.current, nodeSum, args.itemMargin)
          //   : nodeSum;

          alreadyScrolled.current = nodeSum;
        }
      });

      setPrev(
        !itemCountOfScreen.current[itemCountOfScreen.current.length - 1]
          ?.isIntersecting,
      );
      setNext(!itemCountOfScreen.current[0]?.isIntersecting);

      /**
       * Проверяем необходимость отображения кнопок навигации
       */
      if (!isDisplayNavigation && isBrowser) {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        setDisplayNavigation(intersecting.length < args.length && isBrowser);
      }
    },
    [args, isDisplayNavigation],
  );

  const [nodeListRefCallback, { rootRefCallback: rootRefCallbackObserver }] =
    useIntersectionObserver(
      {
        threshold: 0.95,
      },
      observerCallback,
    );

  const rootRef = useRef<HTMLDivElement | null>(null);

  //
  /**
   * TODO: на тач устройствах после восстановления прокрутки не очевидно, что слева есть контент т.к.
   * observerCallback не учитывает args.isOffsetSides
   * или добавить визуальное отображение о количстве элементов и текущей позиции (scrolbar?)
   */
  const saveScrolled = useCallback(
    async (carrentScroll: number, id?: string) => {
      if (id === undefined) return;
      await localStorage.get<ISaveScrolled>(SAVE_SCROLLED).then((storage) => {
        const scroll = {
          ...storage,
          [id]: carrentScroll,
        };

        localStorage.set(SAVE_SCROLLED, scroll);
      });
    },
    [],
  );

  const setScroll = useCallback(
    (left: number) => {
      if (rootRef.current === null) return;

      saveScrolled(left, args.id);
      alreadyScrolled.current = left;
      rootRef.current.scrollTo({
        left,
        behavior: "smooth",
      });
    },
    [args.id, saveScrolled],
  );

  const restoringScroll = useCallback(
    async (id?: string) => {
      if (id === undefined) return;
      const storage = await localStorage.get<ISaveScrolled>(SAVE_SCROLLED);
      setScroll(storage?.[id] ?? 0);
    },
    [setScroll],
  );

  useEffect(() => {
    restoringScroll(args.id);

    return () => {
      saveScrolled(alreadyScrolled.current, args.id);
    };
  }, [args.id, restoringScroll, saveScrolled]);

  const onClickHendler = useCallback<useCarouselHookOnClickHendler>(
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

        const newValue = args.isOffsetSides
          ? nodeSum - offsetSides(rootWidth.current, nodeSum, args.itemMargin)
          : nodeSum;

        const scrollTo = alreadyScrolled.current + newValue;
        const maxOffsetLeft =
          itemCountOfScreen.current[0].offsetLeft -
          args.itemMargin * FULL_MARGIN;

        setScroll(scrollTo > maxOffsetLeft ? maxOffsetLeft : scrollTo);
      }
    },
    [args.isOffsetSides, args.itemMargin, setScroll],
  );

  const onKeyDownHendler = useCallback<useCarouselHookOnKeyDownHendler>(
    ({ code }) => {
      if (code === "ArrowRight" || code === "KeyD") onClickHendler("next");
      if (code === "ArrowLeft" || code === "KeyA") onClickHendler("prev");
    },
    [onClickHendler],
  );

  const rootRefCallback = useCallback<useCarouselHookRootRefCallback>(
    (rootNode) => {
      rootRef.current = rootNode;
      rootRefCallbackObserver(rootNode);
    },
    [rootRefCallbackObserver],
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
};
