/* eslint-disable react/jsx-props-no-spreading */
import { Skeleton } from "@mui/material";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/future/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Nullable } from "../../helpers/typings/utility-types";

import classes from "./Image.module.css";

const ANIMATION_DELAY_MS = 50;

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
  const [needAnimation, setNeedAnimation] = useState(false);
  const [canRemovePlaceholder, setCanRemovePlaceholder] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const isRendered = useCallback(() => {
    if (!imageRef.current) {
      return false;
    }
    const { naturalWidth, naturalHeight } = imageRef.current;

    return naturalWidth > 0 && naturalHeight > 0;
  }, [imageRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded && !isRendered()) {
        setNeedAnimation(true);
      }
    }, ANIMATION_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded, isRendered, setNeedAnimation]);

  useEffect(() => {
    if (!isLoaded && imageRef.current && imageRef.current.complete) {
      setLoaded(true);
    }
  }, [isLoaded]);

  const handleOnAnimationEnd = useCallback(() => {
    setCanRemovePlaceholder(true);
  }, []);

  const handleOnLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const imageClassNames = classNames(classes.image, className, {
    [classes.image_loaded]: isLoaded,
    [classes.image_loading]: needAnimation,
    [classes.image_animated]: needAnimation && isLoaded,
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
        {needAnimation && !canRemovePlaceholder && (
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
