import classNames from "classnames";
import {
  FC,
  KeyboardEvent,
  ReactNode,
  Ref,
  WheelEvent,
  forwardRef,
} from "react";

import classes from "./Scroller.module.css";

type HandleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => void;

type HandleOnScroll = (event: WheelEvent<HTMLDivElement>) => void;

type ScrollerProps = {
  children: ReactNode;
  /**
   * @default false
   */
  isScrollSnap?: boolean;
  onKeyDown?: HandleOnKeyDown;
  onScroll?: HandleOnScroll;
  className?: string;
  ref?: Ref<HTMLDivElement>;
  refItemList?: Ref<HTMLDivElement>;
};

export const Scroller: FC<ScrollerProps> = forwardRef(
  (
    {
      children,
      isScrollSnap = false,
      onKeyDown,
      onScroll,
      className,
      refItemList,
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="presentation"
      onKeyDown={onKeyDown}
      onWheel={onScroll}
      className={classNames(classes.root, {
        [classes.root_scrollSnap]: isScrollSnap,
      })}>
      <div
        ref={refItemList}
        className={classNames(classes.itemList, className)}>
        {children}
      </div>
    </div>
  ),
);

Scroller.displayName = "Scroller";
