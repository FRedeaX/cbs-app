import classNames from "classnames";
import { FC, ReactElement } from "react";

import { Nullable } from "../../../../../helpers/typings/utility-types";
import { Paragraph } from "../../../Paragraph/Paragraph";
import { FontSize } from "../../../utils/types";
import classes from "./List.Item.module.css";

type ListItemProps = {
  /**
   * Текст компонента.
   */
  content: string;
  fontSize?: FontSize;
  style?: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  children: ReactElement;
};

export const ListItem: FC<ListItemProps> = ({
  content,
  fontSize,
  style,
  className,
  children,
}) => (
  <li className={classNames(classes.root, className)}>
    <Paragraph
      component="span"
      content={content}
      fontSize={fontSize}
      style={style}
    />
    {children}
  </li>
);
