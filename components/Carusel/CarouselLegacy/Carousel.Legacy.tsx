import { useQuery } from "@apollo/client";
import classNames from "classnames";
import {
  Children,
  FC,
  ReactElement,
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isBrowser } from "react-device-detect";

import { delay, throttler } from "../../../helpers";
import { GET_WIDTH } from "../../../store/variables/windowWidth";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
import classes from "./Carousel.Legacy.module.css";

// import smoothscroll from "smoothscroll-polyfill";

export interface CarouselLegacyProps {
  children: ReactElement[];
  length?: number;
  itemWidth?: number;
  itemCountOfScreen?: number;
  itemMargin?: number;
  isShadow?: boolean;
  isScrollSnap?: boolean;
  isOpen?: boolean;
  setCount?: (count: number) => void;
  controlsPosition: "top" | "center";
  className: string;
  classNameControl: string;
}

const CarouselLegacy: FC<CarouselLegacyProps> = ({
  children,
  length,
  itemWidth: _itemWidth,
  itemCountOfScreen: _itemCountOfScreen,
  itemMargin = 0,
  isShadow = true,
  isScrollSnap = false,
  isOpen,
  setCount,
  controlsPosition = "center",
  className,
  classNameControl,
}) => {
  const { data } = useQuery(GET_WIDTH);

  const scrollRef = useRef<HTMLDivElement>(null);
  const alreadyScrolledRefVar = useRef<number>(0);
  const countRefVar = useRef<number>(0);
  // const dragXRefVar = useRef(0);

  // ширина 1-го элемента
  const itemWidth = useMemo<number | null>(() => {
    if (_itemWidth) return _itemWidth;

    if (scrollRef.current === null) return null;
    const node = scrollRef.current?.childNodes?.[0].childNodes?.[1];
    if (node instanceof HTMLElement) {
      return node.offsetWidth;
    }

    return null;
  }, [_itemWidth]);

  // кол-во видимых элементов на экране
  const itemCountOfScreen = useMemo<number | null>(() => {
    if (_itemCountOfScreen) return _itemCountOfScreen;

    if (scrollRef.current === null) return null;
    if (itemWidth !== null) {
      return Math.max(Math.floor(scrollRef.current.offsetWidth / itemWidth), 1);
    }

    return null;
  }, [_itemCountOfScreen, itemWidth]);

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);

  useEffect(() => {
    if (!scrollRef.current || !itemWidth || !itemCountOfScreen) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    const l = length || Children.count(children);

    if (
      wrapperWidth < (itemWidth + itemMargin * 2) * l ||
      l > itemCountOfScreen
    ) {
      setRight(true);
    } else {
      setLeft(false);
      setRight(false);
    }
  }, [
    scrollRef,
    length,
    itemMargin,
    setRight,
    itemWidth,
    itemCountOfScreen,
    children,
  ]);

  const hendleClick = useCallback(
    (direction: "left" | "right") => {
      if (!scrollRef.current || !itemWidth || !itemCountOfScreen) return;

      const scrolled = scrollRef.current as HTMLDivElement;
      const scrollTo = (itemWidth + itemMargin * 2) * itemCountOfScreen;

      if (direction === "left") alreadyScrolledRefVar.current -= scrollTo;
      else if (direction === "right") alreadyScrolledRefVar.current += scrollTo;

      scrolled.scroll({
        left: alreadyScrolledRefVar.current,
        behavior: isOpen ? "auto" : "smooth",
      });

      if (alreadyScrolledRefVar.current < 5) {
        setLeft(false);
        alreadyScrolledRefVar.current = 0;
      } else setLeft(true);

      const scrolledScrollW = Math.floor(
        scrolled.scrollWidth - scrolled.offsetWidth,
      );
      if (alreadyScrolledRefVar.current >= scrolledScrollW) {
        setRight(false);
        alreadyScrolledRefVar.current = scrolledScrollW;
      } else setRight(true);

      countRefVar.current = Math.round(
        alreadyScrolledRefVar.current / scrollTo,
      );

      if (setCount !== undefined) setCount(countRefVar.current);
    },
    [isOpen, itemCountOfScreen, itemMargin, itemWidth, setCount],
  );

  const hendleScroll = (event: SyntheticEvent) => {
    event.stopPropagation();

    delay(900).then(() => {
      if (!scrollRef.current) return;
      const scrolled = scrollRef.current;
      alreadyScrolledRefVar.current = scrolled.scrollLeft;

      if (alreadyScrolledRefVar.current < 5) setLeft(false);
      else setLeft(true);

      const { offsetWidth } = scrolled;
      const scrolledScrollW = scrolled.scrollWidth - offsetWidth;
      if (alreadyScrolledRefVar.current >= scrolledScrollW) setRight(false);
      else setRight(true);

      countRefVar.current = Math.round(
        alreadyScrolledRefVar.current / offsetWidth,
      );

      if (setCount !== undefined) setCount(countRefVar.current);
    });
  };

  // const hendleDrag = (event) => {
  //   event.stopPropagation();
  //   const scrolled = scrollRef.current;
  //   const { clientX } = event;
  //   if (clientX === 0 || !scrolled) return;

  //   const direction = dragXRefVar.current - clientX;
  //   if (direction < 0) {
  //     console.log("<");
  //     alreadyScrolledRefVar.current -= scrollTo;
  //   } else if (direction > 0) {
  //     console.log(">");
  //     alreadyScrolledRefVar.current += scrollTo;
  //   }

  //   scrolled.scroll({
  //     left: alreadyScrolledRefVar.current,
  //     behavior: "smooth",
  //   });

  //   // console.log(direction);
  // };

  const hendleKey = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (event.key === "ArrowRight") hendleClick("right");
      else if (event.key === "ArrowLeft") hendleClick("left");
    },
    [hendleClick],
  );

  const buttonNextRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isOpen && isBrowser && buttonNextRef) {
      buttonNextRef.current.focus();
      window.addEventListener("keydown", hendleKey, false);
    } else window.removeEventListener("keydown", hendleKey, false);
  }, [isOpen, buttonNextRef, hendleKey]);

  // в браузерах не поддерживающие свойство scroll-snap
  // при изменении ширины окна браузера
  // изображение смещается относительно области просмотра
  useEffect(() => {
    if (!scrollRef.current) return;

    // if (!"scrollBehavior" in document.documentElement.style) {
    //   smoothscroll.polyfill();
    // }
    const childrenNode = scrollRef.current.children?.[0]
      .children?.[0] as HTMLDivElement;

    alreadyScrolledRefVar.current =
      (childrenNode?.offsetWidth || 0) * countRefVar.current;
  }, [isOpen, data?.windowWidth]);

  // console.log("render Carousel");
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <div
          ref={scrollRef}
          onTouchEnd={(event) => throttler(() => hendleScroll(event))}
          onWheel={(event) => throttler(() => hendleScroll(event))}
          className={classNames(classes.scrolled, {
            [classes["scrolled_scroll-snap"]]: isScrollSnap,
          })}>
          <div
            className={classNames(classes.items, className)}
            // onDragEnter={(event) => (dragXRefVar.current = event.clientX)}
            // onDrag={hendleDrag}
            // onDragEnd={(event) => (dragXRefVar.current = 0)}
          >
            {itemMargin !== 0 && <div style={{ width: `${itemMargin}px` }} />}
            {children}
            {itemMargin !== 0 && <div style={{ width: `${itemMargin}px` }} />}
          </div>
        </div>
        {(isLeft || isRight) && isShadow && isBrowser && (
          <>
            <div
              className={classNames(classes["shadow-left"], {
                [classes["shadow-left--active"]]: isLeft && isShadow,
              })}
            />
            <div
              className={classNames(classes["shadow-right"], {
                [classes["shadow-right--active"]]: isRight && isShadow,
              })}
            />
          </>
        )}

        {(isLeft || isRight) && isBrowser && (
          <div
            className={classNames(
              classes.controls,
              classes[`controls-${controlsPosition}`],
            )}>
            <Button
              className={classNames(classNameControl, {
                [classes.button_events]: isLeft,
                [classes["button_left_full-screen"]]: isOpen,
              })}
              isHidden={!isLeft}
              isDisabled={!isLeft}
              icon={
                <span className={classes.button_icon}>
                  <Icon
                    weight={controlsPosition === "center" ? "medium" : "small"}
                    direction="left"
                  />
                </span>
              }
              onClick={() => hendleClick("left")}
            />
            <Button
              ref={buttonNextRef}
              className={classNames(classNameControl, {
                [classes.button_events]: isRight,
                [classes["button_right_full-screen"]]: isOpen,
              })}
              isHidden={!isRight}
              isDisabled={!isRight}
              icon={
                <span className={classes.button_icon}>
                  <Icon
                    weight={controlsPosition === "center" ? "medium" : "small"}
                    direction="right"
                  />
                </span>
              }
              onClick={() => hendleClick("right")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// function areEqual(prevProps, nextProps) {
//   return (
//     // prevProps.children.length === nextProps.children.length &&
//     prevProps.children.isOpen === nextProps.children.isOpen
//   );
// }

export default memo(CarouselLegacy);
