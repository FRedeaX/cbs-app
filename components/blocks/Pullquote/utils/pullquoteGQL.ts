import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, Gradient, HorizontalAlign } from "../../utils/types";

export type PullquoteBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Цитата.
   */
  value: string;
  /**
   * Цитирование.
   */
  citation: string;
  /**
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
  gradient: "" | Gradient;
  borderColor: "" | Color;
  style: Nullable<string>;
};

export type PullquoteBlockGQL = { attributes: PullquoteBlockGQLAttributes };

export const pullquoteBlockGQL = {
  fragments: gql`
    fragment pullquoteBlockGQL on CorePullquoteBlock {
      ... on CorePullquoteBlock {
        name
        attributes {
          ... on CorePullquoteBlockAttributes {
            anchor
            backgroundColor
            borderColor
            citation
            className
            gradient
            style
            textAlign
            textColor
            value
          }
        }
      }
    }
  `,
};
