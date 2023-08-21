import classNames from "classnames";
import { FC, ReactElement, cloneElement } from "react";

import classes from "./VisuallyHidden.module.css";

export type VisuallyHiddenProps = {
  children: ReactElement;

  /**
   * @default false
   */
  isHidden: boolean;
};

/**
 * Компонент для визуального скрытия `DOM` элемента
 * оставляет его доступным для скринридеров.
 */
export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  children,
  isHidden = false,
}) =>
  isHidden
    ? cloneElement(children, {
        className: classNames(classes.root, children.props.className),
      })
    : children;
