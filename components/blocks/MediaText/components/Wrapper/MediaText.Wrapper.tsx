import classNames from "classnames";
import { FC, ReactNode } from "react";

import { HorizontalMediaAlign, VerticalAlignment } from "../../../utils/types";
import { IBlockWidthResult } from "../../utils";
import cnMedia from "../Media/MediaText.Media.module.css";
import cnText from "../Text/MediaText.Text.module.css";
import classes from "./MediaText.Wrapper.module.css";

interface IMediaTextWrapperProps {
  children: ReactNode;
  mediaType: IBlockWidthResult["mediaType"];
  mediaPosition: HorizontalMediaAlign;
  /**
   * Вертикальное выравнивание (по оси `y`).
   */
  verticalAlignment: VerticalAlignment;
}
const MediaTextWrapper: FC<IMediaTextWrapperProps> = ({
  children,
  mediaType,
  mediaPosition,
  verticalAlignment,
}) => (
  <div
    className={classNames(
      classes[`mediaType_${mediaType}`],
      classes[`mediaPosition_${mediaPosition}`],
      { [classes[`align_${verticalAlignment}`]]: mediaType === "flex" },
      cnMedia[`mediaType_${mediaType}`],
      cnText[`mediaType_${mediaType}`],
    )}>
    {children}
  </div>
);

export default MediaTextWrapper;
