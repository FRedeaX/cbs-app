import classNames from "classnames";
import { FC, ReactElement, Ref, forwardRef, useMemo } from "react";

import { mergeAllRefs } from "../../helpers/frontend/hooks";
import { Scroller } from "../Scroller/Scroller";
import {
  CarouselControls,
  CarouselControlsProps,
} from "./Carousel.Controls/Carousel.Controls";
import classes from "./Carousel.module.css";
import { useCarousel } from "./Carousel.utils/useCarousel";
import { useCarouselContext } from "./Context";

export type CarouselProps = {
  children: ReactElement[];

  /**
   * Отступ у элемента с одной стороны
   *
   * @default 0
   */
  itemMargin?: number;

  className?: string;
  ref?: Ref<HTMLDivElement>;
} & CarouselControlsProps;

export const Carousel: FC<CarouselProps> = forwardRef(
  (
    { children, itemMargin = 0, className, isButtonsOnSides, isShadow },
    ref,
  ) => {
    const {
      rootRefCallback,
      itemListRefCallback,
      leftSideNodeRef,
      rightSideNodeRef,
    } = useCarouselContext();
    const { handleOnScroll } = useCarousel();

    const mergedRefs = useMemo(
      () => mergeAllRefs<HTMLDivElement>(itemListRefCallback, ref),
      [itemListRefCallback, ref],
    );
    const sidesDivStyle = { minWidth: `${itemMargin}px` };

    return (
      <div className={classes.root}>
        <CarouselControls
          isButtonsOnSides={isButtonsOnSides}
          isShadow={isShadow}
        />

        <Scroller
          ref={rootRefCallback}
          onScroll={handleOnScroll}
          className={classNames(classes.Scroller, className)}>
          <div ref={leftSideNodeRef} style={sidesDivStyle} />
          <div ref={mergedRefs} className={classes.itemList}>
            {children}
          </div>
          <div ref={rightSideNodeRef} style={sidesDivStyle} />
        </Scroller>
      </div>
    );
  },
);

Carousel.displayName = "Carousel";
