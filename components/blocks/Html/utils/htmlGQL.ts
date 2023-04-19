import { gql } from "@apollo/client";

export type HtmlBlockGQL = {
  saveContent: string;
};

export const htmlBlockGQL = {
  fragments: gql`
    fragment htmlBlockGQL on CoreHtmlBlock {
      ... on CoreHtmlBlock {
        saveContent
      }
    }
  `,
};
