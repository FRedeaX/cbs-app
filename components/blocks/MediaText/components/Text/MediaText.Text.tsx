/* eslint-disable import/no-cycle */
import classNames from "classnames";
import { FC, ReactElement } from "react";

import { HorizontalMediaAlign } from "../../../utils/types";
import { IBlockWidthResult } from "../../utils";
import classes from "./MediaText.Text.module.css";

export type TextProps = {
  /**
   * Расположение блока по оси `x`.
   */
  mediaPosition: HorizontalMediaAlign;
  /**
   * Ширина `innerBlocks`.
   */
  blockWidth: IBlockWidthResult["text"];
  /**
   * Блоки сбоку от изображения.
   */
  children: ReactElement;
};
const MediaTextText: FC<TextProps> = ({
  mediaPosition,
  blockWidth,
  children,
}) => (
  <div
    style={blockWidth}
    className={classNames(classes.root, {
      [classes.root_left]: mediaPosition === "right",
      [classes.root_right]: mediaPosition === "left",
    })}>
    {children}
  </div>
);

export default MediaTextText;
