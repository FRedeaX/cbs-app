import { gql } from "@apollo/client";

export type SpacerBlockAttributes = {
  height: string;
};

export const spacerBlockGQL = {
  fragments: gql`
    fragment spacerBlockGQL on CoreSpacerBlock {
      ... on CoreSpacerBlock {
        attributes {
          ... on CoreSpacerBlockAttributes {
            height
          }
        }
      }
    }
  `,
};
