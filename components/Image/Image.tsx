/* eslint-disable react/jsx-props-no-spreading */
import { Skeleton } from "@mui/material";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/future/image";
import { FC, useCallback, useState } from "react";

import { Nullable } from "../../helpers/typings/utility-types";

import classes from "./Image.module.css";

export type ImageProps = {
  /**
   * Дополнительный класс для обертки.
   */
  classNamePlaceholder?: string;
  /**
   * Заполнитель для отображения во время загрузки картинки.
   */
  blurDataURL?: Nullable<string>;
  /**
   * Ширина изображения.
   */
  width: number;
  /**
   * Высота изображения.
   */
  height: number;
} & Omit<NextImageProps, "placeholder" | "blurDataURL" | "width" | "height">;

export const Image: FC<ImageProps> = ({
  blurDataURL,
  alt,
  className,
  classNamePlaceholder,
  width,
  height,
  src,
  ...prop
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [canRemovePlaceholder, setCanRemovePlaceholder] = useState(false);

  const handleOnAnimationEnd = useCallback(() => {
    setCanRemovePlaceholder(true);
  }, []);

  const handleOnLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const imageClassNames = classNames(classes.image, className, {
    [classes.image_loaded]: isLoaded,
    [classes.image_loading]: !isLoaded,
  });

  const image = (
    <NextImage
      alt={alt}
      aria-hidden={!alt}
      src={src}
      className={imageClassNames}
      width={width}
      height={height}
      onAnimationEnd={handleOnAnimationEnd}
      onLoadingComplete={handleOnLoad}
      {...prop}
    />
  );

  if (blurDataURL) {
    return (
      <div className={classNames(classes.placeholder, classNamePlaceholder)}>
        {!canRemovePlaceholder && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              src={blurDataURL}
              className={classNames(className, classes.blur)}
              width={width}
              height={height}
            />
            <Skeleton
              className={classNames(className, classes.skeleton)}
              animation="wave"
              width="100%"
              height="100%"
            />
          </>
        )}
        {image}
      </div>
    );
  }

  return image;
};
