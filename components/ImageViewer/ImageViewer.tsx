import { ModalProps, Backdrop, Fade } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

import { useClientHeight } from "@/helpers/frontend/hooks";

import classes from "./ImageViewer.module.css";

const DynamicModal = dynamic(
  () => import("@mui/base/Modal").then((res) => res.Modal),
  {
    ssr: true,
  },
);

type ImageViewerProps = {
  children: ReactNode;
} & Pick<ModalProps, "open" | "onClose" | "onKeyDown">;

export const ImageViewer: FC<ImageViewerProps> = ({
  children,
  open,
  onClose,
  onKeyDown,
}) => {
  const height = useClientHeight();

  return (
    <DynamicModal
      open={open}
      onClose={(event, reason) => {
        if (reason === "escapeKeyDown") onClose?.(event, reason);
      }}
      onKeyDown={onKeyDown}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "var(--white)" },
        },
      }}
      className={classes.root}>
      <Fade in={open}>
        <div
          style={{ "--image-viewer-height": `${height}px` }}
          className={classes.body}>
          {children}
        </div>
      </Fade>
    </DynamicModal>
  );
};
