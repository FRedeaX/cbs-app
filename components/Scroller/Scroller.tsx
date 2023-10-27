import { Box, BoxProps } from "@mui/material";
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

export type ScrollerProps = {
  children: ReactNode;
  /**
   * @default false
   */
  isScrollSnap?: boolean;
  onKeyDown?: HandleOnKeyDown;
  onScroll?: HandleOnScroll;
  sx?: BoxProps["sx"];
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
      <Box
        sx={sx}
        ref={refItemList}
        className={classNames(classes.itemList, className)}>
        {children}
      </Box>
    </div>
  ),
);

Scroller.displayName = "Scroller";
