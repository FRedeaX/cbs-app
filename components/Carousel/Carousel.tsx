import { Box, BoxProps } from "@mui/material";
import classNames from "classnames";
import { FC, ReactElement } from "react";

import { Scroller, ScrollerProps } from "../Scroller/Scroller";

import {
  CarouselControls,
  CarouselControlsProps,
} from "./Carousel.Controls/Carousel.Controls";
import classes from "./Carousel.module.css";
import { useCarousel } from "./Carousel.utils/useCarousel";
import { useCarouselContext } from "./context";

export type CarouselProps = {
  children: ReactElement[];
  sx?: BoxProps["sx"];
  className?: string;
  scrollerProps?: Pick<ScrollerProps, "sx" | "className">;
} & CarouselControlsProps;

export const Carousel: FC<CarouselProps> = ({
  children,
  sx,
  className,
  scrollerProps,
  isButtonsOnSides,
  isShadow,
}) => {
  const { rootRefCallback, itemListRefCallback } = useCarouselContext();
  const { handleOnScroll } = useCarousel();

  return (
    <Box sx={sx} className={classNames(classes.root, className)}>
      <CarouselControls
        isButtonsOnSides={isButtonsOnSides}
        isShadow={isShadow}
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
    </Box>
  );
};
