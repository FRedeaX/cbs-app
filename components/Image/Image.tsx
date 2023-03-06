/* eslint-disable react/jsx-props-no-spreading */
import { Skeleton } from "@mui/material";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/future/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import classes from "./Image.module.css";

const ANIMATION_DELAY_MS = 50;

type ImageProps = {
  /**
   * Дополнительный класс для обертки.
   */
  classNamePlaceholder?: string;
} & NextImageProps;

export const Image: FC<ImageProps> = ({
  placeholder,
  blurDataURL,
  alt,
  style,
  className,
  classNamePlaceholder,
  width,
  height,
  src,
  ...prop
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isFailed, setFailed] = useState(false);
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

  const handleOnError = useCallback(() => {
    setFailed(true);
  }, []);

  const imageClassNames = classNames(className, classes.image, {
    [classes.image_loaded]: isLoaded,
    [classes.image_loading]: needAnimation,
    [classes.image_animated]: needAnimation && isLoaded,
  });

  const image = (
    <NextImage
      alt={alt}
      aria-hidden={alt ? "false" : "true"}
      src={isFailed ? "" : src}
      className={imageClassNames}
      width={width}
      height={height}
      onAnimationEnd={handleOnAnimationEnd}
      onError={handleOnError}
      onLoad={handleOnLoad}
      {...prop}
    />
  );

  if (placeholder === "blur" && blurDataURL !== undefined) {
    return (
      <div
        style={style}
        className={classNames(classes.placeholder, classNamePlaceholder)}>
        {needAnimation && !canRemovePlaceholder && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden="true"
              src={blurDataURL}
              className={classNames(className, classes.blur)}
              width={width}
              height={height}
            />
            <Skeleton
              // sx={sxSkeleton}
              className={classNames(className, classes.skeleton)}
              animation="wave"
              width={width}
              height={height}
            />
          </>
        )}
        {image}
      </div>
    );
  }

  return image;
};
