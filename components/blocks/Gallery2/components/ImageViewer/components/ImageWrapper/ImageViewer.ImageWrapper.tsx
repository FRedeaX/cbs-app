import { FC, ReactNode } from "react";

import classes from "./ImageViewer.ImageWrapper.module.css";

type ImageViewerImageWrapperProps = {
  children: ReactNode;
};

export const ImageViewerImageWrapper: FC<ImageViewerImageWrapperProps> = ({
  children,
}) => <div className={classes.root}>{children}</div>;
