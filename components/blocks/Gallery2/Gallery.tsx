import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

import { CarouselProvider } from "../../Carousel/Context";
import classes from "./Gallery.module.css";
import {
  GalleryCards,
  GalleryCardsProps,
} from "./components/Gallery.Cards/Gallery.Cards";
import { GalleryViewer } from "./components/Gallery.Viewer/Gallery.Viewer";
import { GalleryProvider } from "./context";

type GalleryProps = {
  className: string;
  __typename?: string;
} & GalleryCardsProps &
  HTMLAttributes<HTMLDivElement>;

export const Gallery: FC<GalleryProps> = ({
  caption,
  className,
  imageCrop,
  images,

  // Извлекаем свойства, т.к. они не нужны на DOM узле
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __typename,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={classNames(classes.root, className)} {...props}>
    <GalleryProvider>
      <CarouselProvider isResponsiveWidthsChildren>
        <GalleryViewer images={images} />
        <GalleryCards images={images} imageCrop={imageCrop} caption={caption} />
      </CarouselProvider>
    </GalleryProvider>
  </div>
);
