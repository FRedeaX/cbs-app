import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode, useCallback } from "react";

import { useCarouselHandleOnClick } from "../Carousel.utils/useCarousel";
import classes from "./Carousel.Button.module.css";

export type CarouselButtonProps = {
  children: ReactNode;
  direction: "next" | "prev";
  isActive: boolean;
  onClick: useCarouselHandleOnClick;
};

const style = {
  transitionTimingFunction: "var(--animation-ease-out)",
  transitionDuration: "0.15s",
  transitionProperty: "background-color, box-shadow, transform",
};

export const CarouselButton: FC<CarouselButtonProps> = ({
  children,
  direction,
  isActive,
  onClick,
}) => {
  const onClickHandler = useCallback(() => {
    onClick(direction);
  }, [direction, onClick]);

  return (
    <Box
      className={classNames(
        classes.root,
        classes.root_visibility,
        classes[`root_visibility_${isActive}`],
        classNames(classes[`direction_${direction}`]),
      )}
      onClick={onClickHandler}>
      <IconButton
        className={classNames(classes.iconButton, classes.iconButton_bg, {
          [classes.iconButton_animation]: isActive,
        })}
        sx={style}
        disabled={!isActive}
        aria-label={direction === "next" ? "Следующей" : "Предыдущий"}>
        {children}
      </IconButton>
    </Box>
  );
};
