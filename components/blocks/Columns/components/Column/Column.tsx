import classNames from "classnames";
import { FC, ReactElement } from "react";

import { VerticalAlignment } from "../../../utils/types";
import classes from "./Column.module.css";

type ColumnProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Вертикальное выравнивание (по оси `y`).
   */
  verticalAlignment?: VerticalAlignment;
  /**
   * Ширина столбца.
   * @default "100%"
   */
  width?: string;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  children: ReactElement;
};

export const Column: FC<ColumnProps> = ({
  anchor,
  verticalAlignment,
  width = "100%",
  className,
  children,
}) => (
  <div
    id={anchor || undefined}
    style={{
      flexBasis: width,
    }}
    className={classNames(
      classes.root,
      classes[`root_align_${verticalAlignment}`],
      className,
    )}>
    {children}
  </div>
);
