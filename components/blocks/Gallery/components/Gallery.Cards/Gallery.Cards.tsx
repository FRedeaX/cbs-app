import { FC } from "react";

import { Figure, FigureFigcaption } from "../../../../Figure";
import { splitByLines } from "../../utils";
import {
  GalleryRow,
  GalleryRowProps,
  ImageData,
} from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.Cards.module.css";

export type GalleryCardsProps = {
  caption: string;
} & GalleryRowProps;

export const GalleryCards: FC<GalleryCardsProps> = ({ images, caption }) => {
  const firstImageAspectRatio = images[0].width / images[0].height;

  const image = splitByLines<ImageData>(images, firstImageAspectRatio);
  const moreCount = images.length - image.big.length - image.small.length;

  return (
    <Figure className={classes.Figure}>
      <GalleryRow
        images={image.big}
        classNameWrapper={classes.GalleryRow_row_top}
      />
      <GalleryRow
        images={image.small}
        moreCount={moreCount}
        offset={image.big.length}
        isHiddenFigcaption
        classNameWrapper={classes.GalleryRow_row_bottom}
      />
      {caption && <FigureFigcaption text={caption} />}
    </Figure>
  );
};
