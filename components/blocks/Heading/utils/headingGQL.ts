import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import {
  Color,
  FontSize,
  Gradient,
  HeadingLevel,
  HorizontalAlign,
} from "../../utils/types";

export type HeadingBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Текст компонента.
   */
  content: string;
  /**
   * Уровень заголовка.
   */
  level: HeadingLevel;
  /*
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`.
   */
  textAlign: "" | HorizontalAlign;
  /**
   * Дополнительный класс.
   */
  className: string;

  textColor: "" | Color;
  backgroundColor: "" | Color;
  fontSize: "" | FontSize;
  gradient: "" | Gradient;
  style: Nullable<string>;
};

export type HeadingBlockGQL = {
  attributes: HeadingBlockGQLAttributes;
};

export const headingBlockGQL = {
  fragments: gql`
    fragment headingBlockGQL on CoreHeadingBlock {
      ... on CoreHeadingBlock {
        name
        attributes {
          ... on CoreHeadingBlockAttributes {
            anchor
            backgroundColor
            className
            content
            fontSize
            gradient
            level
            style
            textAlign
            textColor
          }
        }
      }
    }
  `,
};
