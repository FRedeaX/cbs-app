import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Fade } from "@mui/material";
import classNames from "classnames";
import {
  Children,
  FC,
  ReactElement,
  TouchEvent,
  WheelEvent,
  memo,
} from "react";

import { throttler } from "../../helpers";
import CarouselButton from "./Carousel.Button/Carousel.Button";
import CarouselButtonSides from "./Carousel.Button/Carousel.Button.Sides";
import CarouselList from "./Carousel.List";
import CarouselScroller from "./Carousel.Scroller/Carousel.Scroller";
import CarouselShadow from "./Carousel.Shadow/Carousel.Shadow";
import CarouselShadowWrapper from "./Carousel.Shadow/Carousel.Shadow.Wrapper";
import classes from "./Carousel.module.css";
import {
  IArgs,
  IArgsLegacy,
  useCarouselHookResult,
  useCarouselHookResultLegacy,
} from "./Carousel.utils";

interface IUseCarousel {
  (args: IArgs | IArgsLegacy):
    | useCarouselHookResult
    | useCarouselHookResultLegacy;
}

export interface ICarouselProps {
  children: ReactElement[];
  // useCarousel: (args: T) => D;
  useCarousel: IUseCarousel;

  length?: number;

  /**
   * Отступ у элемента с одной стороны
   *
   * @default 0
   */
  itemMargin?: number;

  /**
   * @default false
   */
  isScrollSnap?: boolean;

  /**
   * Расположение кнопок навигации
   *
   * @default true
   */
  isButtonsOnSides?: boolean;

  /**
   * Отступ от границ контейнера при использовании кнопок навигации
   *
   * @default false
   */
  isOffsetSides?: boolean;

  /**
   * Тень по левой и правой стороне контейнера
   *
   * @default true
   */
  isShadow?: boolean;

  className?: string;

  /**
   * ID для сохранения прокрутки
   */
  saveID?: string;
  setCount?: (count: number) => void;
}

const Carousel: FC<ICarouselProps> = ({
  children,
  length = Children.count(children),
  itemMargin = 0,
  isScrollSnap = false,
  isButtonsOnSides = true,
  isOffsetSides = false,
  isShadow = true,
  className,
  saveID,
  setCount,
  useCarousel,
  ...props
}) => {
  const sidesDivStyle = { minWidth: `${itemMargin}px` };
  const [
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
  ] = useCarousel({
    length,
    itemMargin,
    isOffsetSides,
    id: saveID,
    setCount,
    ...props,
  });

  const onScroll = (
    event: TouchEvent<HTMLDivElement> | WheelEvent<HTMLDivElement>,
  ) =>
    typeof hendleScroll === "function" && throttler(() => hendleScroll(event));

  const iconSize = isButtonsOnSides ? "medium" : "small";

  return (
    <div className={classes.root}>
      <Fade in={isDisplayNavigation}>
        <div>
          <CarouselShadowWrapper>
            <CarouselShadow
              isShadow={isShadow}
              direction="prev"
              isActive={isPrev}
            />
            <CarouselShadow
              isShadow={isShadow}
              direction="next"
              isActive={isNext}
            />
          </CarouselShadowWrapper>
          <CarouselButtonSides isButtonsOnSides={isButtonsOnSides}>
            <CarouselButton
              direction="prev"
              isActive={isPrev}
              onClick={onClickHendler}
              onKeyDown={onKeyDownHendler}>
              <ArrowBackIosRoundedIcon fontSize={iconSize} />
            </CarouselButton>
            <CarouselButton
              direction="next"
              isActive={isNext}
              onClick={onClickHendler}
              onKeyDown={onKeyDownHendler}>
              <ArrowForwardIosRoundedIcon fontSize={iconSize} />
            </CarouselButton>
          </CarouselButtonSides>
        </div>
      </Fade>

      <CarouselScroller
        ref={rootRefCallback}
        onKeyDown={onKeyDownHendler}
        onScroll={onScroll}
        isScrollSnap={isScrollSnap}
        className={classNames(classes.itemList, className)}>
        <div style={sidesDivStyle} />
        <CarouselList nodeListRefCallback={nodeListRefCallback}>
          {children}
        </CarouselList>
        <div style={sidesDivStyle} />
      </CarouselScroller>
    </div>
  );
};

function areEqual(prevProps: ICarouselProps, nextProps: ICarouselProps) {
  return (
    prevProps.children[0]?.key === nextProps.children[0]?.key &&
    prevProps.children[0]?.props.className ===
      nextProps.children[0]?.props.className &&
    Children.count(prevProps.children) === Children.count(nextProps.children)
  );
}

export default memo(Carousel, areEqual);
