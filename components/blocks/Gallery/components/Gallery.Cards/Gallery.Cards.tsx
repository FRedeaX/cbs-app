import { FC } from "react";

import { Figure, FigureFigcaption } from "../../../../Figure";
import { splitByLines } from "../../utils";
import { GalleryRow, GalleryRowProps, Image } from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.Cards.module.css";

export type GalleryCardsProps = {
  caption: string;
} & GalleryRowProps;

export const GalleryCards: FC<GalleryCardsProps> = ({ images, caption }) => {
  const image = splitByLines<Image>(images);
  const moreCount = images.length - image.big.length - image.small.length;

  return (
    <Figure className={classes.figure}>
      <GalleryRow images={image.big} />
      <GalleryRow
        images={image.small}
        moreCount={moreCount}
        offset={image.big.length}
        isHiddenFigcaption
      />
      {caption && <FigureFigcaption text={caption} />}
    </Figure>
  );
};
