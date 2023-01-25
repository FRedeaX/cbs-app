import { FC, ReactNode } from "react";

import classes from "./ImageViewer.Body.module.css";

type ImageViewerBodyProps = {
  children: ReactNode;
};

export const ImageViewerBody: FC<ImageViewerBodyProps> = ({ children }) => (
  <div className={classes.root}>{children}</div>
);
