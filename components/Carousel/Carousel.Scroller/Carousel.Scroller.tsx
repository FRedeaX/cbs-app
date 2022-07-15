import classNames from "classnames";
import { FC, LegacyRef, ReactNode, Ref, forwardRef } from "react";

import {
  useCarouselHookOnKeyDownHendler,
  useCarouselLegacyHookScrollHendler,
} from "../Carousel.utils";
import classes from "./Carousel.Scroller.module.css";

interface ICarouselScrollerProps {
  children: ReactNode;
  /**
   * @default false
   */
  isScrollSnap?: boolean;
  onKeyDown?: useCarouselHookOnKeyDownHendler;
  onScroll?: useCarouselLegacyHookScrollHendler;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const CarouselScroller: FC<ICarouselScrollerProps> = forwardRef(
  (
    { children, isScrollSnap = false, onKeyDown, onScroll, className },
    ref?: LegacyRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      role="presentation"
      onKeyDown={onKeyDown}
      onTouchEnd={onScroll}
      onWheel={onScroll}
      className={classNames(classes.root, {
        [classes.root_scrollSnap]: isScrollSnap,
      })}>
      <div className={classNames(classes.itemList, className)}>{children}</div>
    </div>
  ),
);

CarouselScroller.displayName = "CarouselScroller";
export default CarouselScroller;
