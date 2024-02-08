import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

import { CarouselProvider } from "@/components/Carousel";

import classes from "./Gallery.module.css";
import { GalleryCards, GalleryCardsProps } from "./components/Gallery.Cards";
import { GalleryViewer } from "./components/Gallery.Viewer";
import { GalleryProvider } from "./context";
import { isAnimatedSprings } from "./utils";

type GalleryProps = {
  /**
   * @default false
   */
  imageCrop?: boolean;
  className: string | classNames.ArgumentArray;
} & GalleryCardsProps &
  Omit<HTMLAttributes<HTMLDivElement>, "className">;

export const Gallery: FC<GalleryProps> = ({
  caption,
  className,
  imageCrop = false,
  images,
  ...props
}) => {
  if (images.length === 0) return null;

  const isAnimatedDrag = isAnimatedSprings(images.length);

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes.root_imageCrop]: imageCrop,
          [classes.root_animated]: isAnimatedDrag,
        },
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <GalleryProvider>
        <CarouselProvider
          itemMargin={isAnimatedDrag ? -4 : -10}
          typeMovement="transform"
          isResponsiveWidthsChildren>
          <GalleryViewer images={images} />
          <GalleryCards images={images} caption={caption} />
        </CarouselProvider>
      </GalleryProvider>
    </div>
  );
};
