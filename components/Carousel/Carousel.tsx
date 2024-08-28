import { SxProps } from "@mui/material";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { Scroller, ScrollerProps } from "../Scroller/Scroller";

import {
  CarouselControls,
  CarouselControlsProps,
} from "./Carousel.Controls/Carousel.Controls";
import classes from "./Carousel.module.css";
import { useCarousel } from "./Carousel.utils/useCarousel";
import { useCarouselContext } from "./context";

export type CarouselProps = {
  sx?: SxProps;
  className?: string;
  scrollerProps?: Pick<ScrollerProps, "sx" | "className">;
} & CarouselControlsProps;

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  sx,
  className,
  scrollerProps,
  isButtonsOnSides,
  isShadow,
  onClick,
}) => {
  const { rootRefCallback, itemListRefCallback } = useCarouselContext();
  const { handleOnScroll } = useCarousel();

  return (
    <div sx={sx} className={classNames(classes.root, className)}>
      <CarouselControls
        isButtonsOnSides={isButtonsOnSides}
        isShadow={isShadow}
        onClick={onClick}
      />

      <Scroller
        ref={rootRefCallback}
        onScroll={handleOnScroll}
        sx={scrollerProps?.sx}
        className={classNames(classes.Scroller, scrollerProps?.className)}>
        <div ref={itemListRefCallback} className={classes.itemList}>
          {children}
        </div>
      </Scroller>
    </div>
  );
};
