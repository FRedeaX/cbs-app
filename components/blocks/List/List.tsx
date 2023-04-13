import classNames from "classnames";
import { FC, ReactElement } from "react";

import {
  CSSProperties,
  Nullable,
} from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, FontSize, Gradient, ListType } from "../utils/types";

type ListProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Тип списока элементов:
   *  - true - упорядоченный список элементов
   *  - false - неупорядоченный список элементов
   */
  ordered: boolean;
  /**
   * Порядок нумерации.
   * Атрибут `reversed`.
   */
  reversed?: boolean;
  /**
   * Целое число, с которого начинается отсчет элементов списка.
   * Атрибут `start`.
   */
  start?: number;
  /**
   * Задает тип нумерации:
   *  - a для строчных букв
   *  - A для прописных букв
   *  - i для строчных римских цифр
   *  - I для прописных римских цифр
   *  - 1 для чисел
   *
   * Атрибут `type`.
   *
   * @default 1
   * */
  type?: ListType;

  fontSize?: FontSize;
  textColor?: Color;
  backgroundColor?: Color;
  gradient?: Gradient;
  style?: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
  children: ReactElement;
};

export const List: FC<ListProps> = ({
  anchor,
  ordered,
  reversed,
  start,
  type = "1",
  fontSize,
  textColor,
  backgroundColor,
  gradient,
  style,
  className,
  children,
}) => {
  const styleDiv: CSSProperties = parseBlockStyle({
    fontSize,
    textColor,
    backgroundColor,
    gradient,
    style,
  });

  if (ordered) {
    return (
      <ol
        id={anchor || undefined}
        style={styleDiv}
        start={start}
        reversed={reversed}
        type={type}
        className={classNames(className)}>
        {children}
      </ol>
    );
  }

  return (
    <ul
      id={anchor || undefined}
      style={styleDiv}
      className={classNames(className)}>
      {children}
    </ul>
  );
};
