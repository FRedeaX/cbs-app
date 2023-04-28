import { ButtonBase, ButtonProps } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./ImageViewer.Button.module.css";

export type ImageViewerButtonProps = {
  children: ReactNode;
} & Pick<ButtonProps, "className" | "onClick">;

export const ImageViewerButton: FC<ImageViewerButtonProps> = ({
  children,
  className,
  onClick,
}) => (
  <ButtonBase
    className={classNames(classes.root, className)}
    onClick={onClick}
    aria-label="Открыть изображение">
    {children}
  </ButtonBase>
);
