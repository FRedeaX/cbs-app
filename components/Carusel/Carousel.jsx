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
import smoothscroll from "smoothscroll-polyfill";

const Carousel = ({
  children,
  length,
  itemWidth,
  itemCountOfScreen,
  itemMargin = 0,
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
  const { data } = useQuery(GET_WIDTH);

  const scrollRef = useRef();
  const alreadyScrolledRefVar = useRef(0);
  const countRefVar = useRef(0);
  // const dragXRefVar = useRef(0);

  const itemWidthRef = useRef(itemWidth);
  const itemCountOfScreenRef = useRef(itemCountOfScreen);
  // ширина 1 элемента
  // кол-во элементов на экране
  useEffect(() => {
    if (scrollRef.current === undefined) return;
    const scrolled = scrollRef.current;
    const scrolledOffsetW = scrolled.offsetWidth;

    if (itemWidth === undefined)
      itemWidthRef.current = scrolled.children[0].children[0].offsetWidth;
    // else itemWidthRef.current = itemWidth;

    if (itemCountOfScreenRef === undefined)
      itemCountOfScreenRef.current = Math.max(
        Math.floor(scrolledOffsetW / itemWidthRef.current),
        1
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
      wrapperWidth < (itemWidthRef.current + itemMargin) * l ||
      l > itemCountOfScreenRef.current
    ) {
      setRight(true);
    }
  }, [
    scrollRef,
    children.length,
    length,
    itemWidthRef.current,
    itemMargin,
    itemCountOfScreenRef.current,
    setRight,
  ]);

  const hendleClick = (direction) => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const scrollTo =
      (itemWidthRef.current + itemMargin * 2) * itemCountOfScreenRef.current;

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

    const scrolledScrollW = Math.floor(
      scrolled.scrollWidth - scrolled.offsetWidth
    );
    if (alreadyScrolledRefVar.current >= scrolledScrollW) {
      setRight(false);
      alreadyScrolledRefVar.current = scrolledScrollW;
    } else setRight(true);

    countRefVar.current = Math.round(alreadyScrolledRefVar.current / scrollTo);

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
  useEffect(() => {
    if (!scrollRef.current) return;

    // if (!"scrollBehavior" in document.documentElement.style) {
    //   smoothscroll.polyfill();
    // }
    alreadyScrolledRefVar.current =
      scrollRef.current.children[0].children[0].offsetWidth *
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
              <div className={classes["controls-buttons_full-screen"]}>
                <Button
                  className={classNames(
                    classes["button--inActive"],
                    classes["button-left"],
                    classes["button_full-screen_left"],
                    classNameControl
                  )}
                  isHidden={!isLeft}
                  isDisabled={!isLeft}
                  onClick={() => hendleClick("left")}
                />
                <Button
                  ref={buttonNextRef}
                  className={classNames(
                    classes["button--inActive"],
                    classes["button-right"],
                    classes["button_full-screen_right"],
                    classNameControl
                  )}
                  isHidden={!isRight}
                  isDisabled={!isRight}
                  onClick={() => hendleClick("right")}
                />
              </div>
            )}

            <Button
              className={classNames(
                classes["button-left"],
                classes["button-background_color"],
                classNameControl,
                {
                  [classes["button_events"]]: isLeft,
                  // [classes["button--inActive"]]: !isBrowser,
                }
              )}
              isHidden={!isLeft}
              isDisabled={!isLeft}
              icon={
                <Icon
                  weight={controlsPosition === "center" ? "medium" : "small"}
                  direction={"left"}
                />
              }
              onClick={() => hendleClick("left")}
            />
            <Button
              className={classNames(
                classes["button-right"],
                classes["button-background_color"],
                classNameControl,
                {
                  [classes["button_events"]]: isRight,
                  // [classes["button--inActive"]]: !isBrowser,
                }
              )}
              isHidden={!isRight}
              isDisabled={!isRight}
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
