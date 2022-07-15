import {
  TouchEvent,
  WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { isBrowser } from "react-device-detect";

import { delay } from "../../../helpers";
import { IntersectionObserverHookRefCallback } from "../../../helpers/frontend/hooks/useIntersectionObserver";
import { OFFSET_LEFT_MARGIN } from "../Carousel.const";
import {
  IArgs,
  useCarouselHookOnClickHendler,
  useCarouselHookOnKeyDownHendler,
  useCarouselHookRootRefCallback,
} from "./useCarousel";

export interface IArgsLegacy extends IArgs {
  itemWidth?: number;
  itemCountOfScreen?: number;
  isOpen?: boolean;
}

export type useCarouselLegacyHookScrollHendler = (
  event: TouchEvent<HTMLDivElement> | WheelEvent<HTMLDivElement>,
) => void;

export type useCarouselHookResultLegacy = [
  IntersectionObserverHookRefCallback,
  {
    onClickHendler: useCarouselHookOnClickHendler;
    onKeyDownHendler: useCarouselHookOnKeyDownHendler;
    rootRefCallback: useCarouselHookRootRefCallback;
    isPrev: boolean;
    isNext: boolean;
    isDisplayNavigation: boolean;

    hendleScroll: useCarouselLegacyHookScrollHendler;
  },
];

export const useCarouselLegacy = (
  args: IArgsLegacy,
): useCarouselHookResultLegacy => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isPrev, setPrev] = useState(false);
  const [isNext, setNext] = useState(true);
  const [isDisplayNavigation, setDisplayNavigation] = useState(false);

  const alreadyScrolledRefVar = useRef<number>(0);
  const countRefVar = useRef<number>(0);

  /**
   * Ширина 1-го элемента
   */
  const itemWidth = useRef<number | null>(null);
  const getItemWidth = (): number | null => {
    if (args.itemWidth) return args.itemWidth;

    if (rootRef.current === null) return null;
    const node = rootRef.current?.childNodes?.[0].childNodes?.[1];

    if (node instanceof HTMLElement) {
      return node.offsetWidth;
    }

    return null;
  };

  /**
   * Кол-во видимых элементов на экране
   */
  const itemCountOfScreen = useRef<number | null>(null);
  const getItemCountOfScreen = (): number | null => {
    if (args.itemCountOfScreen) return args.itemCountOfScreen;

    if (rootRef.current === null) return null;
    if (itemWidth.current !== null) {
      return Math.max(
        Math.floor(rootRef.current.offsetWidth / itemWidth.current),
        1,
      );
    }

    return null;
  };

  /**
   * Проверяем необходимость отображения кнопок навигации
   */
  useEffect(() => {
    if (isDisplayNavigation && !isBrowser) return;
    if (!rootRef.current || !itemWidth.current || !itemCountOfScreen.current)
      return;
    const scrolled = rootRef.current;
    const wrapperWidth = scrolled.offsetWidth;

    if (
      wrapperWidth <
        (itemWidth.current + args.itemMargin * OFFSET_LEFT_MARGIN) *
          args.length ||
      args.length > itemCountOfScreen.current
    ) {
      setDisplayNavigation(true);
    }
  }, [args.itemMargin, args.length, isDisplayNavigation]);

  /**
   * Обновляем itemWidth и itemCountOfScreen
   * при изменении args.isOpen
   */
  useEffect(() => {
    itemWidth.current = getItemWidth();
    itemCountOfScreen.current = getItemCountOfScreen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.isOpen]);

  const onClickHendler = useCallback(
    (direction: "prev" | "next") => {
      if (!rootRef.current || !itemWidth.current || !itemCountOfScreen.current)
        return;

      const scrolled = rootRef.current as HTMLDivElement;
      const scrollTo =
        (itemWidth.current + args.itemMargin * OFFSET_LEFT_MARGIN) *
        itemCountOfScreen.current;

      if (direction === "prev") alreadyScrolledRefVar.current -= scrollTo;
      else if (direction === "next") alreadyScrolledRefVar.current += scrollTo;

      scrolled.scroll({
        left: alreadyScrolledRefVar.current,
        behavior: args.isOpen ? "auto" : "smooth",
      });

      if (alreadyScrolledRefVar.current < 5) {
        setPrev(false);
        alreadyScrolledRefVar.current = 0;
      } else setPrev(true);

      const scrolledScrollW = Math.floor(
        scrolled.scrollWidth - scrolled.offsetWidth,
      );
      if (alreadyScrolledRefVar.current >= scrolledScrollW) {
        setNext(false);
        alreadyScrolledRefVar.current = scrolledScrollW;
      } else setNext(true);

      countRefVar.current =
        Math.round(alreadyScrolledRefVar.current / scrollTo) + 1;

      if (args.setCount !== undefined) args.setCount(countRefVar.current);
    },
    [args],
  );

  const hendleScroll = useCallback<useCarouselLegacyHookScrollHendler>(
    (event) => {
      event.stopPropagation();

      delay(900).then(() => {
        if (!rootRef.current) return;
        const scrolled = rootRef.current;
        alreadyScrolledRefVar.current = scrolled.scrollLeft;

        if (alreadyScrolledRefVar.current < 5) setPrev(false);
        else setPrev(true);

        const { offsetWidth } = scrolled;
        const scrolledScrollW = scrolled.scrollWidth - offsetWidth;
        if (alreadyScrolledRefVar.current >= scrolledScrollW) setNext(false);
        else setNext(true);

        countRefVar.current = Math.round(
          alreadyScrolledRefVar.current / offsetWidth,
        );

        if (args.setCount !== undefined) args.setCount(countRefVar.current);
      });
    },
    [args],
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
      itemWidth.current = getItemWidth();
      itemCountOfScreen.current = getItemCountOfScreen();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const nodeListRefCallback = () => undefined;

  return [
    nodeListRefCallback,
    {
      onClickHendler,
      onKeyDownHendler,
      rootRefCallback,
      isPrev,
      isNext,
      isDisplayNavigation,
      hendleScroll,
    },
  ];
};
