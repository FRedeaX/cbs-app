import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { FC, ReactNode } from "react";

import { noop } from "../../helpers";
import { useClientHeight } from "../../helpers/frontend/hooks";
import classes from "./ImageViewer.module.css";

type ImageViewerProps = {
  children: ReactNode;
} & Pick<SwipeableDrawerProps, "open" | "onClose" | "onKeyDown">;

export const ImageViewer: FC<ImageViewerProps> = ({
  children,
  open,
  onClose,
  onKeyDown,
}) => {
  const height = useClientHeight();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={noop}
      onClose={onClose}
      onKeyDown={onKeyDown}
      swipeAreaWidth={0}
      ModalProps={{
        // Возможны проблемы в React 18.
        // see https://mui.com/material-ui/react-drawer/#keep-mounted
        keepMounted: false,
      }}>
      <div
        style={{ "--image-viewer-height": `${height}px` }}
        className={classes.root}>
        {children}
      </div>
    </SwipeableDrawer>
  );
};
