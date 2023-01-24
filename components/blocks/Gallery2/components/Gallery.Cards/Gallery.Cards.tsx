import { FC } from "react";

import { splitByLines } from "../../utils";
import { GalleryRow, GalleryRowProps, Image } from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.Cards.module.css";

export type GalleryCardsProps = {
  caption: string;
} & GalleryRowProps;

export const GalleryCards: FC<GalleryCardsProps> = ({
  images,
  imageCrop,
  caption,
}) => {
  const image = splitByLines<Image>(images);

  return (
    <figure className={classes.figure}>
      <GalleryRow images={image.big} imageCrop={imageCrop} />
      <GalleryRow images={image.small} imageCrop={imageCrop} />
      {caption && (
        <figcaption className={classes.caption}>{caption}</figcaption>
      )}
    </figure>
  );
};
