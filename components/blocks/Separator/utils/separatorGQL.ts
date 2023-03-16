import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";

type BackgroundColor =
  | "black"
  | "cyan-bluish-gray"
  | "white"
  | "pale-pink"
  | "vivid-red"
  | "luminous-vivid-orange"
  | "luminous-vivid-amber"
  | "light-green-cyan"
  | "vivid-green-cyan"
  | "pale-cyan-blue"
  | "vivid-cyan-blue"
  | "vivid-purple";

type ClassName = "is-style-default" | "is-style-wide" | "is-style-dots";

type Gradient =
  | "vivid-cyan-blue-to-vivid-purple"
  | "light-green-cyan-to-vivid-green-cyan"
  | "luminous-vivid-amber-to-luminous-vivid-orange"
  | "luminous-vivid-orange-to-vivid-red"
  | "very-light-gray-to-cyan-bluish-gray"
  | "cool-to-warm-spectrum"
  | "blush-light-purple"
  | "blush-bordeaux"
  | "luminous-dusk"
  | "pale-ocean"
  | "electric-grass"
  | "midnight";

export type SeparatorStyle = {
  color: {
    background?: string;
    gradient?: string;
  };
};

export type SeparatorBlockAttributes = {
  anchor: string;
  backgroundColor: BackgroundColor;
  className: ClassName;
  gradient: Gradient;
  style: Nullable<string>;
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
