/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Fade, Skeleton } from "@mui/material";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/future/image";
import { FC, useCallback, useState, useRef, useEffect } from "react";

import { Nullable } from "../../helpers/typings/utility-types";

import classes from "./Image.module.css";
import { sxRoot } from "./Image.style";
import { getImageBlurSvg } from "./utils/getImageBlurSvg";

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

type ImageRef = HTMLDivElement & {
  children: [HTMLImageElement];
};

export const Image: FC<ImageProps> = ({
  blurDataURL,
  alt,
  className,
  width,
  height,
  src,
  ...props
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [needAnimation, setNeedAnimation] = useState(false);
  const [canRemovePlaceholder, setCanRemovePlaceholder] = useState(false);

  const imageRef = useRef<Nullable<ImageRef>>(null);

  const isRendered = useCallback(() => {
    if (!imageRef.current) {
      return false;
    }
    const { naturalWidth, naturalHeight } = imageRef.current.children[0];

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
    <Box ref={imageRef} sx={sxRoot}>
      <NextImage
        alt={alt}
        aria-hidden={!alt}
        src={src}
        className={classNames(classes.image, className)}
        width={width}
        height={height}
        onLoadingComplete={handleOnLoad}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL ?? undefined}
        {...props}
      />
      {blurDataURL && needAnimation && !canRemovePlaceholder && (
        <Fade in={needAnimation && !isLoaded} easing="ease" timeout={600}>
          <div className={cnPlaceholder} onAnimationEnd={handleOnAnimationEnd}>
            <div className={classes.backdrop} />
            <img
              alt=""
              aria-hidden
              src={`data:image/svg+xml;charset=utf-8,${getImageBlurSvg({
                width,
                height,
                blurDataURL,
              })}`}
              className={classes.blur}
            />
            <Skeleton className={classes.skeleton} animation="wave" />
          </div>
        </Fade>
      )}
    </Box>
  );
};
