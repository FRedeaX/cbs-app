import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode, useCallback } from "react";

import {
  useCarouselHookOnClickHendler,
  useCarouselHookOnKeyDownHendler,
} from "../Carousel.utils";
import classes from "./Carousel.Button.module.css";

interface ICarouselButtonProps {
  children: ReactNode;
  direction: "next" | "prev";
  isActive: boolean;
  onClick: useCarouselHookOnClickHendler;
  onKeyDown: useCarouselHookOnKeyDownHendler;
}

const style = {
  transitionTimingFunction: "var(--animation-ease-out)",
  transitionDuration: "0.15s",
  transitionProperty: "background-color, box-shadow, transform",
};

const CarouselButton: FC<ICarouselButtonProps> = ({
  children,
  direction,
  isActive,
  onClick,
  onKeyDown,
}) => {
  const onClickHendler = useCallback(() => {
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
      onKeyDown={onKeyDown}
      onClick={onClickHendler}>
      <IconButton
        className={classNames(classes.iconButton, classes.iconButton_bg, {
          [classes.iconButton_animation]: isActive,
        })}
        sx={style}
        disabled={!isActive}>
        {children}
      </IconButton>
    </Box>
  );
};

export default CarouselButton;
