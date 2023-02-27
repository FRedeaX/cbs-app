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
  /**
   * @default false
   */
  imageCrop?: boolean;
  className: string;
  __typename?: string;
} & GalleryCardsProps &
  HTMLAttributes<HTMLDivElement>;

export const Gallery: FC<GalleryProps> = ({
  caption,
  className,
  imageCrop = false,
  images,

  // Извлекаем свойства, т.к. они не нужны на DOM узле
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __typename,
  ...props
}) => (
  <div
    className={classNames(
      classes.root,
      { [classes.root_imageCrop]: imageCrop },
      className,
    )}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}>
    <GalleryProvider>
      <CarouselProvider
        itemMargin={-10}
        typeMovement="transform"
        isResponsiveWidthsChildren>
        <GalleryViewer images={images} />
        <GalleryCards images={images} caption={caption} />
      </CarouselProvider>
    </GalleryProvider>
  </div>
);
