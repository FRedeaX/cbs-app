import { gql } from "@apollo/client";

type SpacerBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  height: string;
};

export type SpacerBlockGQL = {
  attributes: SpacerBlockGQLAttributes;
};

export const spacerBlockGQL = {
  fragments: gql`
    fragment spacerBlockGQL on CoreSpacerBlock {
      ... on CoreSpacerBlock {
        attributes {
          ... on CoreSpacerBlockAttributes {
            anchor
            height
          }
        }
      }
    }
  `,
};
