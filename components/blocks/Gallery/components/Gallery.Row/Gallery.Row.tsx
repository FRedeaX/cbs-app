import NextImage from "next/future/image";
import { FC } from "react";

import { Figure, FigureFigcaption } from "../../../../Figure";
import {
  VisuallyHidden,
  VisuallyHiddenProps,
} from "../../../../VisuallyHidden/VisuallyHidden";
import { GalleryButton } from "../Gallery.Button/Gallery.Button";
import classes from "./Gallery.Row.module.css";

export type Image = {
  id: string;
  alt: string;
  url: string;
  width: number;
  height: number;
  caption: string;
};

export type GalleryRowProps = {
  images: Image[];

  /**
   * @default false
   */
  imageCrop?: boolean;

  /**
   * Смещение `index` относительно предыдущих строк.
   * @default 0
   */
  offset?: number;

  /**
   * Визуально скрывает подпись к изображению.
   */
  isHiddenFigcaption?: VisuallyHiddenProps["isHidden"];
};

export const GalleryRow: FC<GalleryRowProps> = ({
  images,
  imageCrop = false,
  offset = 0,
  isHiddenFigcaption,
}) => (
  <div className={classes.root}>
    {images.map((image, index) => {
      const aspectRatio = image.width / image.height;
      return (
        <Figure
          key={image.id}
          style={{ flex: imageCrop ? "1" : `${aspectRatio}` }}
          className={classes.wrapper}>
          <GalleryButton className={classes.button} index={index + offset}>
            <NextImage
              alt={image.alt}
              src={image.url}
              width={450}
              height={450 / aspectRatio}
              sizes={`${100 / images.length}vw`}
              className={classes.image}
              loading="lazy"
            />
          </GalleryButton>
          {(image.caption || image.alt) && (
            <VisuallyHidden isHidden={isHiddenFigcaption}>
              <FigureFigcaption
                text={image.caption || image.alt}
                className={classes.text_clamp}
                position="inside"
                isClamp
              />
            </VisuallyHidden>
          )}
        </Figure>
      );
    })}
  </div>
);
