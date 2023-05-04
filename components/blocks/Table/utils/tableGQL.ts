import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, FontSize, Gradient, HorizontalAlign } from "../../utils/types";

export type Cell = {
  /**
   * Горизонтальное выравнивание содержимого.
   */
  align: "" | HorizontalAlign;
  /**
   * Текст компонента.
   */
  content: string;
};

export type TableBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Подпись.
   */
  // caption: string;
  /**
   * Ячейки таблицы фиксированной ширины.
   */
  hasFixedLayout: boolean;
  head: { cells: Cell[] }[];
  body: { cells: Cell[] }[];
  foot: { cells: Cell[] }[];
  /**
   * Дополнительный класс.
   */
  className: string;

  backgroundColor: "" | Color;
  borderColor: "" | Color;
  fontSize: "" | FontSize;
  gradient: "" | Gradient;
  textColor: "" | Color;
  style: Nullable<string>;
};

export type TableBlockGQL = {
  attributes: TableBlockGQLAttributes;
};

export const tableBlockGQL = {
  fragments: gql`
    fragment tableBlockGQL on CoreTableBlock {
      ... on CoreTableBlock {
        name
        attributes {
          ... on CoreTableBlockAttributes {
            anchor
            backgroundColor
            borderColor
            className
            fontSize
            gradient
            hasFixedLayout
            style
            textColor
            head {
              cells {
                align
                content
              }
            }
            body {
              cells {
                align
                content
              }
            }
            foot {
              cells {
                align
                content
              }
            }
          }
        }
      }
    }
  `,
};
