/* eslint-disable import/no-cycle */
import classNames from "classnames";
import { FC, useMemo } from "react";

import { blocksType } from "../Blocks";
import MediaTextMedia from "./MediaText.Media/MediaText.Media";
import cnMedia from "./MediaText.Media/MediaText.Media.module.css";
import MediaTextText from "./MediaText.Text/MediaText.Text";
import cnText from "./MediaText.Text/MediaText.Text.module.css";
import MediaTextWrapper from "./MediaText.Wrapper/MediaText.Wrapper";
import classes from "./MediaText.module.css";
import {
  background as getBackground,
  blockWidth as getBlockWidth,
  color as getColor,
  objectPosition as getObjectPosition,
  mediaPositionType,
  verticalAlignmentType,
} from "./MediaText.utils";

export interface IMediaTextProps {
  backgroundColor: string;
  gradient: string;
  mediaPosition: mediaPositionType;
  mediaWidth: number;
  style: string | null;
  textColor: string;
  verticalAlignment: verticalAlignmentType;
  imageFill: boolean;
  mediaAlt: string;
  mediaUrl: string;
  width: number;
  height: number;
  focalPoint: string | null;
  className: string;
  innerBlocks: blocksType[];
}

export const MediaText: FC<IMediaTextProps> = ({
  backgroundColor,
  gradient,
  mediaPosition,
  mediaWidth,
  style,
  textColor,
  verticalAlignment,
  imageFill,
  mediaAlt,
  mediaUrl,
  width,
  height,
  focalPoint,
  className,
  innerBlocks,
}) => {
  const background = useMemo(
    () => getBackground({ backgroundColor, gradient, style }),
    [backgroundColor, gradient, style],
  );

  const color = useMemo(
    () => getColor({ textColor, style }),
    [textColor, style],
  );

  const objectPosition = useMemo(
    () => getObjectPosition({ focalPoint }),
    [focalPoint],
  );

  const blockWidth = useMemo(
    () =>
      getBlockWidth({
        mediaWidth,
        isFloat: Boolean(className.split(" ").find((cn) => cn === "float")),
      }),
    [className, mediaWidth],
  );

  return (
    <div
      style={{ background, color }}
      className={classNames(classes.root, {
        [classes.root_borderRadius]: background,
        [cnMedia.background]: background,
        [cnText.background]: background,
      })}>
      <MediaTextWrapper
        mediaPosition={mediaPosition}
        mediaType={blockWidth.mediaType}>
        <MediaTextMedia
          mediaPosition={mediaPosition}
          blockWidth={blockWidth.media}
          imageFill={imageFill}
          objectPosition={objectPosition}
          mediaAlt={mediaAlt}
          mediaUrl={mediaUrl}
          width={width}
          height={height}
        />
        <MediaTextText
          mediaPosition={mediaPosition}
          blockWidth={blockWidth.text}
          verticalAlignment={verticalAlignment}
          color={color}
          innerBlocks={innerBlocks}
        />
      </MediaTextWrapper>
    </div>
  );
};
