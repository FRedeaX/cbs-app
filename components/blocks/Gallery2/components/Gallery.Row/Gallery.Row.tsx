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
  /**
   * @default true
   */
  imageCrop?: boolean;
  images: Image[];
};

export const GalleryRow: FC<GalleryRowProps> = ({
  imageCrop = true,
  images,
}) => (
  <div className={classes.root}>
    {images.map((image, index) => (
      <figure
        key={image.id}
        style={{ flex: imageCrop ? `${image.width / image.height}` : "1" }}
        className={classes.wrapper}>
        <GalleryButton index={index}>
          <NextImage
            alt={image.alt}
            src={image.url}
            width={image.width}
            height={image.height}
            className={classes.image}
          />
        </GalleryButton>
        {image.alt && (
          <figcaption className={classes.caption}>{image.alt}</figcaption>
        )}
      </figure>
    ))}
  </div>
);
