import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, Gradient } from "../../utils/types";

export type SeparatorVariant =
  | "is-style-default"
  | "is-style-wide"
  | "is-style-dots";

type SeparatorBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  backgroundColor: Color;
  className: Nullable<SeparatorVariant>;
  gradient: Gradient;
  style: Nullable<string>;
};

export type SeparatorBlockGQL = {
  attributes: SeparatorBlockGQLAttributes;
};

export const separatorBlockGQL = {
  fragments: gql`
    fragment separatorBlockGQL on CoreSeparatorBlock {
      ... on CoreSeparatorBlock {
        attributes {
          ... on CoreSeparatorBlockAttributes {
            anchor
            className
            backgroundColor
            gradient
            style
          }
        }
      }
    }
  `,
};
