/* eslint-disable import/no-cycle */
import classNames from "classnames";
import { FC } from "react";

import Blocks, { blocksType } from "../../Blocks";
import {
  IBlockWidthResult,
  mediaPositionType,
  verticalAlignmentType,
} from "../MediaText.utils";
import classes from "./MediaText.Text.module.css";

interface ITextProps {
  mediaPosition: mediaPositionType;
  blockWidth: IBlockWidthResult["text"];
  verticalAlignment: verticalAlignmentType;
  color: string;
  innerBlocks: blocksType[];
}
const MediaTextText: FC<ITextProps> = ({
  mediaPosition,
  blockWidth,
  verticalAlignment,
  color,
  innerBlocks,
}) => (
  <div
    style={blockWidth}
    className={classNames(
      classes.root,
      classes[`root_aline_${verticalAlignment}`],
      {
        [classes.root_left]: mediaPosition === "right",
        [classes.root_right]: mediaPosition === "left",
      },
    )}>
    <Blocks blocks={innerBlocks} {...{ textColor: color }} />
  </div>
);

export default MediaTextText;
