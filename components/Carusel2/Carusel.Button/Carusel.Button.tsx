import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode, useCallback } from "react";
import {
  useCarusel2HookOnClickHendler,
  useCarusel2HookOnKeyDownHendler,
} from "../useCarusel2";
import classes from "./Carusel.Button.module.css";

interface CaruselButtonProps {
  children: ReactNode;
  direction: "next" | "prev";
  isActive: boolean;
  isButtonsOnSides: boolean;
  onClick: useCarusel2HookOnClickHendler;
  onKeyDown: useCarusel2HookOnKeyDownHendler;
}

const CaruselButton: FC<CaruselButtonProps> = ({
  children,
  direction,
  isActive,
  isButtonsOnSides,
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
        classes[`root_sides_${isButtonsOnSides}`],
        classes.root_visibility,
        classes[`root_visibility_${isActive}`],
        {
          [classes[`root_${direction}`]]: isButtonsOnSides,
        },
      )}
      onClick={onClickHendler}>
      <IconButton
        className={classNames(classes.iconButton, classes.iconButton_bg, {
          [classes.iconButton_animation]: isActive,
        })}
        onKeyDown={onKeyDown}
        disabled={!isActive}>
        {children}
      </IconButton>
    </Box>
  );
};

export default CaruselButton;
