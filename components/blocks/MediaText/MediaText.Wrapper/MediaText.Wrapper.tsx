import classNames from "classnames";
import { FC, ReactNode } from "react";

import cnMedia from "../MediaText.Media/MediaText.Media.module.css";
import cnText from "../MediaText.Text/MediaText.Text.module.css";
import { IBlockWidthResult, mediaPositionType } from "../MediaText.utils";
import classes from "./MediaText.Wrapper.module.css";

interface IMediaTextWrapperProps {
  children: ReactNode;
  mediaType: IBlockWidthResult["mediaType"];
  mediaPosition: mediaPositionType;
}
const MediaTextWrapper: FC<IMediaTextWrapperProps> = ({
  children,
  mediaType,
  mediaPosition,
}) => (
  <div
    className={classNames(
      classes[`mediaType_${mediaType}`],
      cnMedia[`mediaType_${mediaType}`],
      cnText[`mediaType_${mediaType}`],
      [classes[`mediaPosition_${mediaPosition}`]],
    )}>
    {children}
  </div>
);

export default MediaTextWrapper;
