import classNames from "classnames";
import { FC, ReactNode } from "react";

import { Figure, FigureFigcaption } from "@/components/Figure";

import classes from "./ImageViewer.Figure.module.css";

type ImageViewerFigureProps = {
  children: ReactNode;
  aspectRatio: number;
  className?: string;
  figcaptionText?: string;
};

export const ImageViewerFigure: FC<ImageViewerFigureProps> = ({
  children,
  aspectRatio,
  figcaptionText,
  className,
}) => (
  <Figure className={classNames(classes.root, className)}>
    <div
      style={{ maxWidth: `calc(var(--image-viewer-body) * ${aspectRatio})` }}>
      {children}
    </div>
    {figcaptionText && (
      <FigureFigcaption text={figcaptionText} position="inside" />
    )}
  </Figure>
);
