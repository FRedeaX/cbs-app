import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { FC, ReactNode } from "react";

import { noop } from "../../../../../helpers";
import classes from "./ImageViewer.module.css";

type ImageViewerProps = {
  children: ReactNode;
} & Pick<SwipeableDrawerProps, "open" | "onClose">;

export const ImageViewer: FC<ImageViewerProps> = ({
  children,
  open,
  onClose,
}) => (
  <SwipeableDrawer
    anchor="bottom"
    open={open}
    onOpen={noop}
    onClose={onClose}
    ModalProps={{
      keepMounted: false,
    }}
    hysteresis={1}>
    <div className={classes.root}>
      {/* <div className={classes.body}></div> */}

      {children}
    </div>
  </SwipeableDrawer>
);
