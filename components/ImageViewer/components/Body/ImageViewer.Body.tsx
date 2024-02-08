import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./ImageViewer.Body.module.css";

type ImageViewerBodyProps = {
  children: ReactNode;
  className?: string | classNames.ArgumentArray;
};

export const ImageViewerBody: FC<ImageViewerBodyProps> = ({
  children,
  className,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={classNames(classes.root, className)} {...props}>
    {children}
  </div>
);
