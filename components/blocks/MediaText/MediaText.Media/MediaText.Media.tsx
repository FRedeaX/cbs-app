import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";

import { Figure } from "../../Image/Figure";
import { IBlockWidthResult, mediaPositionType } from "../MediaText.utils";
import classes from "./MediaText.Media.module.css";

interface IMediaProps {
  mediaPosition: mediaPositionType;
  blockWidth: IBlockWidthResult["media"];
  imageFill: boolean;
  objectPosition?: string;
  mediaAlt: string;
  mediaUrl: string;
  width: number;
  height: number;
}

const MediaTextMedia: FC<IMediaProps> = ({
  mediaPosition,
  blockWidth,
  imageFill,
  objectPosition,
  mediaAlt,
  mediaUrl,
  width,
  height,
}) => (
  <div
    style={blockWidth}
    className={classNames(
      classes.root,
      classes[`root_mediaPosition_${mediaPosition}`],
    )}>
    <Figure isFill={imageFill}>
      <Image
        src={mediaUrl}
        alt={mediaAlt}
        // layout={imageFill === true ? "fill" : "intrinsic"}
        width={width}
        height={height}
        objectFit={imageFill ? "cover" : "contain"}
        objectPosition={objectPosition}
        // blurDataURL={base64}
        // placeholder="blur"
        className={classNames(classes.image)}
      />
    </Figure>
  </div>
);

export default MediaTextMedia;
