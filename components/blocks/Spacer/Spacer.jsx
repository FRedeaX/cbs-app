import { gql } from "@apollo/client";

export const spacerBlockGQL = {
  fragments: gql`
    fragment spacerBlockGQL on CoreSpacerBlock {
      ... on CoreSpacerBlock {
        attributes {
          height
        }
      }
    }
  `,
};

export const Spacer = ({ height }) => (
  <div style={{ height: `${height}px` }} aria-hidden="true" />
);
