import NextImage from "next/future/image";
import { FC } from "react";

import { GalleryButton } from "../Gallery.Button/Gallery.Button";
import classes from "./Gallery.Row.module.css";

export type Image = {
  id: string;
  alt: string;
  url: string;
  width: number;
  height: number;
};

export type GalleryRowProps = {
  images: Image[];

  /**
   * @default false
   */
  imageCrop?: boolean;

  /**
   * Смещение `index` относительно предыдущих строк
   * @default 0
   */
  offset?: number;
};

export const GalleryRow: FC<GalleryRowProps> = ({
  images,
  imageCrop = false,
  offset = 0,
}) => (
  <div className={classes.root}>
    {images.map((image, index) => {
      const aspectRatio = image.width / image.height;
      return (
        <figure
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
          {image.alt && (
            <figcaption className={classes.caption}>{image.alt}</figcaption>
          )}
        </figure>
      );
    })}
  </div>
);
