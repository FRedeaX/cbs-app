import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";

import { delay, throttler } from "../../helpers";
import { GET_WIDTH } from "../../store/variables/windowWidth";
import Button from "../UI/Button/Button";
import Icon from "../UI/Icon/Icon";
import classes from "./Carousel.module.css";

// import smoothscroll from "smoothscroll-polyfill";

const Carousel = ({
  children,
  length,
  itemWidth,
  itemCountOfScreen,
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

  const scrollRef = useRef();
  const alreadyScrolledRefVar = useRef(0);
  const countRefVar = useRef(0);
  // const dragXRefVar = useRef(0);

  // ширина 1-го элемента
  const itemWidthRef = useRef(itemWidth);
  // кол-во видимых элементов на экране
  const itemCountOfScreenRef = useRef(itemCountOfScreen);
  useEffect(() => {
    if (scrollRef.current === undefined) return;
    const scrolled = scrollRef.current;
    const scrolledOffsetW = scrolled.offsetWidth;

    if (itemWidth === undefined)
      itemWidthRef.current = scrolled.children?.[0].children?.[1]?.offsetWidth;

    if (itemCountOfScreenRef.current === undefined)
      itemCountOfScreenRef.current = Math.max(
        Math.floor(scrolledOffsetW / itemWidthRef.current),
        1,
      );
  }, [itemWidth, scrollRef, isOpen, data?.windowWidth]);

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    const l = length || children.length;

    if (
      wrapperWidth < (itemWidthRef.current + itemMargin * 2) * l ||
      l > itemCountOfScreenRef.current
    ) {
      setRight(true);
    } else {
      setLeft(false);
      setRight(false);
    }
  }, [scrollRef, children.length, length, itemMargin, setRight]);

  const hendleClick = useCallback(
    (direction) => {
      if (!scrollRef.current) return;

      const scrolled = scrollRef.current;
      const scrollTo =
        (itemWidthRef.current + itemMargin * 2) * itemCountOfScreenRef.current;

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
    [isOpen, itemMargin, setCount],
  );

  const hendleScroll = (event) => {
    event.stopPropagation();
    if (!scrollRef.current) return;

    delay(900).then(() => {
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
    (event) => {
      event.stopPropagation();
      if (event.key === "ArrowRight") hendleClick("right");
      else if (event.key === "ArrowLeft") hendleClick("left");
    },
    [hendleClick],
  );

  const buttonNextRef = useRef(null);
  useEffect(() => {
    if (isOpen && isBrowser) {
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
    alreadyScrolledRefVar.current =
      scrollRef.current.children?.[0].children?.[0]?.offsetWidth *
      countRefVar.current;

    // console.log();
    // scrollRef.current.scroll({
    //   left: alreadyScrolledRefVar.current,
    // });
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

export default memo(Carousel);
