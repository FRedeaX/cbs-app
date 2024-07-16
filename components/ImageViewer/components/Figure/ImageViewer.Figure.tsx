import classNames from "classnames";
import { FC, ReactNode } from "react";

import { Figure, FigureFigcaption } from "@/components/Figure";

import classes from "./ImageViewer.Figure.module.css";

type ImageViewerFigureProps = {
  children: ReactNode;
  width: number;
  height: number;
  className?: string;
  figcaptionText?: string;
};

export const ImageViewerFigure: FC<ImageViewerFigureProps> = ({
  children,
  width,
  height,
  figcaptionText,
  className,
}) => (
  <Figure
    style={{
      "--image-max-width": `calc(var(--image-viewer-body) * ${width / height})`,
    }}
    className={classNames(classes.root, className)}>
    {children}
    {figcaptionText && (
      <FigureFigcaption text={figcaptionText} position="inside" />
    )}
  </Figure>
);
