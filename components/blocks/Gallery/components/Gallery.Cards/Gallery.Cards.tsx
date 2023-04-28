import { FC } from "react";

import { Figure, FigureFigcaption } from "../../../../Figure";
import { splitByLines } from "../../utils";
import { GalleryRow, GalleryRowProps } from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.Cards.module.css";

export type GalleryCardsProps = {
  caption: string;
} & GalleryRowProps;

export const GalleryCards: FC<GalleryCardsProps> = ({ images, caption }) => {
  const image = splitByLines(images.slice(0, 10));
  const moreCount = images.length - image.first.length - image.last.length;

  return (
    <Figure className={classes.Figure}>
      <GalleryRow
        images={image.first}
        classNameWrapper={classes.GalleryRow_row_top}
      />
      <GalleryRow
        images={image.last}
        moreCount={moreCount}
        offset={image.first.length}
        isHiddenFigcaption
        classNameWrapper={classes.GalleryRow_row_bottom}
      />
      {caption && <FigureFigcaption text={caption} />}
    </Figure>
  );
};
