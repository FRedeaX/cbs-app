import classNames from "classnames";
import { FC, ReactNode } from "react";

import { Figure, FigureFigcaption } from "../../../Figure";
import classes from "./ImageViewer.Figure.module.css";

type ImageViewerFigureProps = {
  children: ReactNode;
  className?: string;
  figcaptionText?: string;
};

export const ImageViewerFigure: FC<ImageViewerFigureProps> = ({
  children,
  figcaptionText,
  className,
}) => (
  <Figure className={classNames(classes.root, className)}>
    {children}
    {figcaptionText && (
      <FigureFigcaption text={figcaptionText} position="inside" />
    )}
  </Figure>
);
