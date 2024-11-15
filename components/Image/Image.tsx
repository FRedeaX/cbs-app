"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
import { Fade, Skeleton } from "@mui/material";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { FC, useCallback, useState, useRef, useEffect } from "react";

import { Nullable } from "../../helpers/typings/utility-types";

import classes from "./Image.module.css";
import { sxRoot } from "./Image.style";
import { getImageBlurSvg } from "./utils/getImageBlurSvg";
import { isRendered } from "./utils/isRendered";
import { ref } from "yup";

const ANIMATION_DELAY_MS = 50;

export type ImageProps = {
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
  width,
  height,
  src,
  style,
  ...props
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [needAnimation, setNeedAnimation] = useState(false);
  const [canRemovePlaceholder, setCanRemovePlaceholder] = useState(false);

  const imageRef = useRef<Nullable<HTMLImageElement>>(null);

  useEffect(() => {
    const ref = imageRef.current;
    const timer = setTimeout(() => {
      if (!isLoaded && ref && !isRendered(ref)) {
        setNeedAnimation(true);
      }
    }, ANIMATION_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded, setNeedAnimation]);

  const handleOnAnimationEnd = useCallback(() => {
    setCanRemovePlaceholder(true);
  }, []);

  const handleOnLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const cnPlaceholder = classNames(classes.placeholder, className, {
    [classes.placeholder_animated]: needAnimation && isLoaded,
  });

  return (
    <div ref={imageRef} sx={sxRoot}>
      <NextImage
        ref={imageRef}
        alt={alt}
        aria-hidden={!alt}
        src={src}
        style={style}
        className={classNames(classes.image, className)}
        width={width}
        height={height}
        onLoad={handleOnLoad}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL ?? undefined}
        {...props}
      />
      {blurDataURL && needAnimation && !canRemovePlaceholder && (
        <Fade in={needAnimation && !isLoaded} easing="ease" timeout={600}>
          <div
            data-testid="image-placeholder"
            className={cnPlaceholder}
            onAnimationEnd={handleOnAnimationEnd}>
            <div className={classes.backdrop} />
            <img
              alt=""
              aria-hidden
              src={`data:image/svg+xml;charset=utf-8,${getImageBlurSvg({
                width,
                height,
                blurDataURL,
                objectFit: style?.objectFit,
              })}`}
              className={classes.blur}
            />
            <Skeleton className={classes.skeleton} animation="wave" />
          </div>
        </Fade>
      )}
    </div>
  );
};

Image.displayName = "Image";
