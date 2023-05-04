import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, FontSize, Gradient, HorizontalAlign } from "../../utils/types";

export type VerseBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  textAlign: "" | HorizontalAlign;
  /**
   * Текст компонента.
   */
  content: string;
  /**
   * Дополнительный класс.
   */
  className: string;

  fontSize: "" | FontSize;
  textColor: "" | Color;
  backgroundColor: "" | Color;
  gradient: "" | Gradient;
  style: Nullable<string>;
};

export type VerseBlockGQL = {
  attributes: VerseBlockGQLAttributes;
};

export const verseBlockGQL = {
  fragments: gql`
    fragment verseBlockGQL on CoreVerseBlock {
      ... on CoreVerseBlock {
        name
        attributes {
          ... on CoreVerseBlockAttributes {
            anchor
            textAlign
            content
            fontSize
            textColor
            backgroundColor
            gradient
            style
            className
          }
        }
      }
    }
  `,
};
