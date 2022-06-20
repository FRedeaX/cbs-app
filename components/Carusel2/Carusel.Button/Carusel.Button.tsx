import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode, useCallback } from "react";
import classes from "./Carusel.Button.module.css";

interface CaruselButtonProps {
  children: ReactNode;
  direction: "next" | "prev";
  isActive: boolean;
  isButtonsOnSides: boolean;
  onClick: (direction: "next" | "prev") => void;
}

const CaruselButton: FC<CaruselButtonProps> = ({
  children,
  direction,
  isActive,
  isButtonsOnSides,
  onClick,
}) => {
  const onClickHendler = useCallback(() => {
    onClick(direction);
  }, [direction, onClick]);

  return (
    <Box
      className={classNames(
        classes.root,
        classes[`root_sides_${isButtonsOnSides}`],
        {
          [classes[`root_${direction}`]]: isButtonsOnSides,
        },
      )}
      onClick={onClickHendler}>
      <IconButton
        className={classNames(classes.iconButton, classes.iconButton_bg, {
          [classes.iconButton_animation]: isActive,
        })}
        disabled={!isActive}>
        {children}
      </IconButton>
    </Box>
  );
};

export default CaruselButton;
