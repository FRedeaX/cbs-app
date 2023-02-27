import NextImage from "next/future/image";
import { FC } from "react";

import { Figure, FigureFigcaption } from "../../../../Figure";
import {
  VisuallyHidden,
  VisuallyHiddenProps,
} from "../../../../VisuallyHidden/VisuallyHidden";
import { GalleryButton } from "../Gallery.Button/Gallery.Button";
import { GalleryMore } from "../Gallery.More/Gallery.More";
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
   * Количество изображений доступных дополнительно в полноэкранном режиме.
   */
  moreCount?: number;

  /**
   * Смещение `index` относительно предыдущей строки.
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
  moreCount,
  offset = 0,
  isHiddenFigcaption,
}) => (
  <div className={classes.root}>
    {images.map((image, index) => {
      const aspectRatio = image.width / image.height;

      return (
        <Figure
          key={image.id}
          style={{ flex: `var(--gallery-image-flex, ${aspectRatio})` }}
          className={classes.wrapper}>
          <GalleryButton className={classes.button} index={index + offset}>
            {!!moreCount && index === images.length - 1 && (
              <GalleryMore count={moreCount} />
            )}
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
