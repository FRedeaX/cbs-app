import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./ImageViewer.ImageWrapper.module.css";

type ImageViewerImageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const ImageViewerImageWrapper: FC<ImageViewerImageWrapperProps> = ({
  children,
  className,
}) => <div className={classNames(classes.root, className)}>{children}</div>;
