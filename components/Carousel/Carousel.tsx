import classNames from "classnames";
import { FC, ReactElement } from "react";

import { CSSProperties } from "../../helpers/typings/utility-types";
import { Scroller } from "../Scroller/Scroller";
import {
  CarouselControls,
  CarouselControlsProps,
} from "./Carousel.Controls/Carousel.Controls";
import classes from "./Carousel.module.css";
import { useCarousel } from "./Carousel.utils/useCarousel";
import { useCarouselContext } from "./context";

export type CarouselProps = {
  children: ReactElement[];
  className?: string;
} & CarouselControlsProps;

export const Carousel: FC<CarouselProps> = ({
  children,
  className,
  isButtonsOnSides,
  isShadow,
}) => {
  const { rootRefCallback, itemListRefCallback, itemMargin } =
    useCarouselContext();
  const { handleOnScroll } = useCarousel();

  const sidesDivStyle: CSSProperties = { minWidth: `${itemMargin}px` };

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
        {itemMargin > 0 && <div style={sidesDivStyle} />}
        <div ref={itemListRefCallback} className={classes.itemList}>
          {children}
        </div>
        {itemMargin > 0 && <div style={sidesDivStyle} />}
      </Scroller>
    </div>
  );
};
