import classNames from "classnames";
import { FC } from "react";

import { Image, ImageProps } from "../../../Image/Image";
import { HorizontalMediaAlign } from "../../../utils/types";
import { BlockWidthResult } from "../../utils";
import classes from "./MediaText.Media.module.css";

export type MediaProps = {
  /**
   * Альтернативный текст.
   */
  mediaAlt: string;
  /**
   * Ссылка на изображение.
   */
  mediaUrl: string;
  /**
   * Свойство `object-fit`.
   * @default false
   */
  imageFill?: boolean;
  /**
   * Свойство `object-position`.
   * @default false
   */
  objectPosition?: string;
  /**
   * Расположение блока по оси `x`.
   */
  mediaPosition?: HorizontalMediaAlign;
  /**
   * Ширина блока с изображением.
   */
  blockWidth?: BlockWidthResult["media"];
} & Pick<ImageProps, "width" | "height" | "blurDataURL">;

const MediaTextMedia: FC<MediaProps> = ({
  mediaAlt,
  mediaUrl,
  imageFill,
  objectPosition,
  mediaPosition,
  blockWidth,
  width,
  height,
  blurDataURL,
}) => (
  <div
    style={blockWidth}
    className={classNames(
      classes.root,
      classes[`root_mediaPosition_${mediaPosition}`],
    )}>
    <Image
      src={mediaUrl}
      alt={mediaAlt}
      width={width}
      height={height}
      blurDataURL={blurDataURL}
      AnimatedImageProps={{
        style: { objectPosition },
        className: classNames({
          [classes.image_objectFit_cover]: imageFill,
        }),
      }}
    />
  </div>
);

export default MediaTextMedia;
