import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";
import Button from "~/components/UI/Button/Button";
import { Icon } from "~/components/UI/Icon/Icon";
import { throttler } from "~/helpers";
import { delay } from "~/helpers/delay";
import { GET_WIDTH } from "~/store/variables/windowWidth";
import classes from "./Carousel.module.css";

const Carousel = ({
  children,
  length,
  itemWidth,
  itemMargin = 0,
  // itemCountOfScreen = 3,
  isShadow = true,
  isScrollSnap = false,
  isKeyPress = false,
  isOpen,
  setCount,
  controlsPosition = "center",
  className,
  classNameControl,
  classNameControls,
}) => {
  const scrollRef = useRef();
  const alreadyScrolledRefVar = useRef(0);
  const countRefVar = useRef(0);
  // const dragXRefVar = useRef(0);

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    const l = length || children.length;

    if (itemWidth === undefined)
      itemWidth = scrolled.children[0].children[0].offsetWidth;
    const scrolledOffsetW = scrolled.offsetWidth;
    const itemCountOfScreen = Math.floor(scrolledOffsetW / itemWidth);

    if (wrapperWidth < (itemWidth + itemMargin) * l || l > itemCountOfScreen)
      setRight(true);
  }, [children.length, length, itemWidth, setRight]);

  const hendleClick = (direction) => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;

    if (itemWidth === undefined)
      itemWidth = scrolled.children[0].children[0].offsetWidth;

    const scrolledOffsetW = scrolled.offsetWidth;
    const itemCountOfScreen = Math.floor(scrolledOffsetW / itemWidth);

    const scrollTo = (itemWidth + itemMargin * 2) * itemCountOfScreen - 14;

    console.log(itemCountOfScreen);

    if (direction === "left") alreadyScrolledRefVar.current -= scrollTo;
    else if (direction === "right") alreadyScrolledRefVar.current += scrollTo;

    scrolled.scroll({
      left: alreadyScrolledRefVar.current,
      behavior: "smooth",
    });

    if (alreadyScrolledRefVar.current < 5) {
      setLeft(false);
      alreadyScrolledRefVar.current = 0;
    } else setLeft(true);

    const scrolledScrollW = scrolled.scrollWidth - scrolled.offsetWidth;
    if (alreadyScrolledRefVar.current >= scrolledScrollW) {
      setRight(false);
      alreadyScrolledRefVar.current = scrolledScrollW;
    } else setRight(true);

    countRefVar.current = Math.round(
      (alreadyScrolledRefVar.current + itemCountOfScreen) / scrollTo
    );
    if (setCount !== undefined) setCount(countRefVar.current);
  };

  const hendleScroll = (event) => {
    event.stopPropagation();
    if (!scrollRef.current) return;

    delay(900).then(() => {
      const scrolled = scrollRef.current;
      alreadyScrolledRefVar.current = scrolled.scrollLeft;

      if (alreadyScrolledRefVar.current < 5) setLeft(false);
      else setLeft(true);

      const offsetWidth = scrolled.offsetWidth;
      const scrolledScrollW = scrolled.scrollWidth - offsetWidth;
      if (alreadyScrolledRefVar.current >= scrolledScrollW) setRight(false);
      else setRight(true);

      countRefVar.current = Math.round(
        alreadyScrolledRefVar.current / offsetWidth
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

  const hendleKey = useCallback((event) => {
    event.stopPropagation();
    if (event.key === "ArrowRight") hendleClick("right");
    else if (event.key === "ArrowLeft") hendleClick("left");
  }, []);

  const buttonNextRef = useRef(null);
  useEffect(() => {
    if (isOpen && isBrowser) {
      buttonNextRef.current.focus();
      window.addEventListener("keydown", hendleKey, false);
    } else window.removeEventListener("keydown", hendleKey, false);
  }, [isOpen, buttonNextRef]);

  // в браузерах не поддерживающие свойство scroll-snap
  // при изменении ширины окна браузера
  // изображение смещается относительно области просмотра
  const { data } = useQuery(GET_WIDTH);
  useEffect(() => {
    alreadyScrolledRefVar.current =
      scrollRef.current.children[0].children[0].offsetWidth *
      countRefVar.current;

    scrollRef.current.scroll({
      left: alreadyScrolledRefVar.current,
    });
  }, [isOpen, data?.windowWidth]);

  // console.log("render Carousel");
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <div
          ref={scrollRef}
          onTouchEnd={(event) => throttler(() => hendleScroll(event))}
          onWheel={(event) => throttler(() => hendleScroll(event))}
          className={classNames(classes.scrolled, className, {
            [classes["scrolled_scroll-snap"]]: isScrollSnap,
          })}
        >
          <div
            className={classes.items}
            // onDragEnter={(event) => (dragXRefVar.current = event.clientX)}
            // onDrag={hendleDrag}
            // onDragEnd={(event) => (dragXRefVar.current = 0)}
          >
            {children}
          </div>
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
        <>
          <div
            className={classNames(
              classes.controls,
              classNameControls,
              classes[`controls-${controlsPosition}`]
            )}
          >
            {isOpen && (
              <>
                <Button
                  className={classNames(
                    classes["button--inActive"],
                    classes["button_full-screen"],
                    classes["button_full-screen_left"],
                    classes["button-left"],
                    classNameControl
                  )}
                  isHidden={!isLeft}
                  onClick={() => hendleClick("left")}
                />
                <Button
                  ref={buttonNextRef}
                  className={classNames(
                    classes["button--inActive"],
                    classes["button_full-screen"],
                    classes["button_full-screen_right"],
                    classes["button-right"],
                    classNameControl
                  )}
                  isHidden={!isRight}
                  onClick={() => hendleClick("right")}
                />
              </>
            )}

            <Button
              className={classNames(classes["button-left"], classNameControl, {
                [classes["button_events"]]: isLeft,
                // [classes["button--inActive"]]: !isBrowser,
              })}
              isHidden={!isLeft}
              icon={
                <Icon
                  weight={controlsPosition === "center" ? "medium" : "small"}
                  direction={"left"}
                />
              }
              onClick={() => hendleClick("left")}
            />
            <Button
              className={classNames(classes["button-right"], classNameControl, {
                [classes["button_events"]]: isRight,
                // [classes["button--inActive"]]: !isBrowser,
              })}
              isHidden={!isRight}
              icon={
                <Icon
                  weight={controlsPosition === "center" ? "medium" : "small"}
                  direction={"right"}
                />
              }
              onClick={() => hendleClick("right")}
            />
          </div>
        </>
      )}
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
