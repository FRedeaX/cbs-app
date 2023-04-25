import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, FontSize, Gradient, HorizontalAlign } from "../../utils/types";

export type ParagraphBlockGQLAttributes = {
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  align: "" | HorizontalAlign;
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Содержание компонента.
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

export type ParagraphBlockGQL = { attributes: ParagraphBlockGQLAttributes };

export const paragraphBlockGQL = {
  fragments: gql`
    fragment paragraphBlockGQL on CoreParagraphBlock {
      ... on CoreParagraphBlock {
        name
        attributes {
          ... on CoreParagraphBlockAttributes {
            align
            anchor
            className
            content
            fontSize
            textColor
            backgroundColor
            gradient
            style
          }
        }
      }
    }
  `,
};
