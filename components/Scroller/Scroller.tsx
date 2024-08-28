import { SxProps } from "@mui/material";
import classNames from "classnames";
import {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  Ref,
  WheelEvent,
  forwardRef,
} from "react";

import classes from "./Scroller.module.css";

type HandleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => void;

type HandleOnScroll = (event: WheelEvent<HTMLDivElement>) => void;

export type ScrollerProps = {
  /**
   * @default false
   */
  isScrollSnap?: boolean;
  onKeyDown?: HandleOnKeyDown;
  onScroll?: HandleOnScroll;
  sx?: SxProps;
  className?: string;
  refItemList?: Ref<HTMLDivElement>;
};

export const Scroller = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ScrollerProps>
>(
  (
    {
      children,
      isScrollSnap = false,
      onKeyDown,
      onScroll,
      sx,
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
        sx={sx}
        ref={refItemList}
        className={classNames(classes.itemList, className)}>
        {children}
      </div>
    </div>
  ),
);

Scroller.displayName = "Scroller";
