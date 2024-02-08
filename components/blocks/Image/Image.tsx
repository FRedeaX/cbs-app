import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

import { useToggle } from "../../../helpers/frontend/hooks";
import { Figure, FigureFigcaption } from "../../Figure";
import {
  Image as AnimatedImage,
  ImageProps as IAnimatedImageProps,
} from "../../Image/Image";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerButton,
  ImageViewerFigure,
  ImageViewerHeader,
  ImageViewerZoom,
} from "../../ImageViewer";
import { AlignImage } from "../utils/types";

import classes from "./Image.module.css";

type ImagePropsExtends = "alt" | "src" | "width" | "height" | "blurDataURL";

export type ImageProps = {
  /**
   * Расположение изображения по оси `x`.
   */
  align?: AlignImage;
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Подпись.
   */
  caption?: string;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  AnimatedImageProps?: Omit<IAnimatedImageProps, ImagePropsExtends>;
} & Pick<IAnimatedImageProps, ImagePropsExtends> &
  Omit<HTMLAttributes<HTMLDivElement>, "className">;

export const Image: FC<ImageProps> = ({
  align,
  anchor,
  caption,
  alt,
  src,
  width,
  height,
  blurDataURL,
  className,
  AnimatedImageProps,
  ...props
}) => {
  const [isOpen, setToggle] = useToggle(false);
  const captionOrAlt = caption || alt;

  return (
    <div
      id={anchor || undefined}
      className={classNames(classes.root, className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <ImageViewer open={isOpen} onClose={setToggle}>
        <ImageViewerHeader onClose={setToggle} />
        <ImageViewerBody>
          <ImageViewerFigure
            className={classes.imageWrapper}
            figcaptionText={captionOrAlt}>
            <ImageViewerZoom>
              <AnimatedImage
                alt={alt}
                src={src}
                width={width}
                height={height}
                sizes="100vw"
                loading="lazy"
                blurDataURL={blurDataURL}
              />
            </ImageViewerZoom>
          </ImageViewerFigure>
        </ImageViewerBody>
      </ImageViewer>

      <div className={classes[`align_${align}`]}>
        <Figure>
          <ImageViewerButton onClick={setToggle}>
            <AnimatedImage
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...AnimatedImageProps}
              alt={alt}
              src={src}
              width={width}
              height={height}
              sizes="100vw"
              className={classes.image}
              loading="lazy"
              blurDataURL={blurDataURL}
            />
          </ImageViewerButton>
          {captionOrAlt && (
            <FigureFigcaption text={captionOrAlt} position="outside" />
          )}
        </Figure>
      </div>
    </div>
  );
};
