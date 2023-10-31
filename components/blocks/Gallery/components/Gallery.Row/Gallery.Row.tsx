import classNames from "classnames";
import { FC } from "react";

import {
  CSSProperties,
  Nullable,
} from "../../../../../helpers/typings/utility-types";
import { Figure, FigureFigcaption } from "../../../../Figure";
import { Image } from "../../../../Image/Image";
import {
  VisuallyHidden,
  VisuallyHiddenProps,
} from "../../../../VisuallyHidden/VisuallyHidden";
import { GalleryButton } from "../Gallery.Button/Gallery.Button";
import { GalleryMore } from "../Gallery.More/Gallery.More";

import classes from "./Gallery.Row.module.css";

export type ImageData = {
  id: number;
  alt: string;
  url: string;
  width: number;
  height: number;
  caption: string;
  blurDataURL: Nullable<string>;
};

export type GalleryRowProps = {
  images: ImageData[];
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
  /**
   * Дополнительный класс для обертки изображения.
   */
  classNameWrapper?: string | classNames.ArgumentArray;
};

export const GalleryRow: FC<GalleryRowProps> = ({
  images,
  moreCount,
  offset = 0,
  isHiddenFigcaption,
  classNameWrapper,
}) => (
  <div className={classes.root}>
    {images.map((image, index) => {
      const aspectRatio = image.width / image.height;
      const sizes = Math.max(100 / images.length, 25);
      const captionOrAlt = image.caption || image.alt;

      const style: CSSProperties = {
        flex: images.length > 1 ? aspectRatio : 1,
      };

      return (
        <Figure
          key={image.id}
          style={style}
          className={classNames(classes.wrapper, classNameWrapper)}>
          <GalleryButton className={classes.button} index={index + offset}>
            {!!moreCount && index === images.length - 1 && (
              <GalleryMore count={moreCount} />
            )}
            <Image
              alt={image.alt}
              src={image.url}
              width={450}
              height={450 / aspectRatio}
              sizes={`${sizes}vw`}
              className={classes.image}
              loading="lazy"
              blurDataURL={image.blurDataURL}
            />
          </GalleryButton>
          {captionOrAlt && (
            <VisuallyHidden isHidden={isHiddenFigcaption}>
              <FigureFigcaption
                text={captionOrAlt}
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
