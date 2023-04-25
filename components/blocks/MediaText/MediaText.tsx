/* eslint-disable import/no-cycle */
import classNames from "classnames";
import { FC } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import {
  Color,
  FontSize,
  Gradient,
  HorizontalMediaAlign,
  VerticalAlignment,
} from "../utils/types";
import classes from "./MediaText.module.css";
import MediaTextMedia, { MediaProps } from "./components/Media/MediaText.Media";
import cnMedia from "./components/Media/MediaText.Media.module.css";
import MediaTextText, { TextProps } from "./components/Text/MediaText.Text";
import cnText from "./components/Text/MediaText.Text.module.css";
import MediaTextWrapper from "./components/Wrapper/MediaText.Wrapper";
import { getBlockWidth, getObjectPosition } from "./utils";

type MediaTextProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;

  fontSize?: FontSize;
  textColor?: Color;
  backgroundColor?: Color;
  gradient?: Gradient;
  style?: Nullable<string>;

  /**
   * Свойство `object-fit`.
   * @default false
   */
  imageFill?: boolean;
  /**
   * JSON
   * @example
   * {
   *    x: number;
   *    y: number
   * }
   */
  focalPoint?: Nullable<string>;
  mediaAlt: string;
  mediaUrl: string;
  /**
   * @default 50
   */
  mediaWidth?: number;
  /**
   * @default 'left'
   */
  mediaPosition?: HorizontalMediaAlign;
  /**
   * Вертикальное выравнивание (по оси `y`).
   * @default 'center'
   */
  verticalAlignment?: VerticalAlignment;
  /**
   * @default false
   */
  isFloat?: boolean;

  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
} & Pick<MediaProps, "width" | "height" | "blurDataURL"> &
  Pick<TextProps, "children">;

export const MediaText: FC<MediaTextProps> = ({
  anchor,

  fontSize,
  textColor,
  backgroundColor,
  gradient,
  style,

  imageFill = false,
  focalPoint,
  mediaAlt,
  mediaPosition = "left",
  mediaUrl,
  mediaWidth = 50,
  verticalAlignment = "center",
  isFloat = false,
  width,
  height,
  blurDataURL,

  className,
  children,
}) => {
  const styleDiv = parseBlockStyle({
    textColor,
    backgroundColor,
    gradient,
    fontSize,
    style,
  });

  const objectPosition = getObjectPosition({ focalPoint });

  const blockWidth = getBlockWidth({
    mediaWidth,
    isFloat,
  });

  const background = !!styleDiv.backgroundColor;

  return (
    <div
      id={anchor || undefined}
      style={styleDiv}
      className={classNames(className, {
        [classes.root_borderRadius]: background,
        [cnMedia.background]: background,
        [cnText.background]: background,
      })}>
      <MediaTextWrapper
        mediaPosition={mediaPosition}
        mediaType={blockWidth.mediaType}
        verticalAlignment={verticalAlignment}>
        <MediaTextMedia
          mediaPosition={mediaPosition}
          blockWidth={blockWidth.media}
          imageFill={imageFill}
          objectPosition={objectPosition}
          mediaAlt={mediaAlt}
          mediaUrl={mediaUrl}
          width={width}
          height={height}
          blurDataURL={blurDataURL}
        />
        <MediaTextText
          mediaPosition={mediaPosition}
          blockWidth={blockWidth.text}>
          {children}
        </MediaTextText>
      </MediaTextWrapper>
    </div>
  );
};
