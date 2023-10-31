import { gql } from "@apollo/client";

type Node = {
  template: {
    templateName: "Default" | "Redirect";
  };
  uri: string;
};

type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type GetPathQuery = {
  pages: { nodes: Node[]; pageInfo: PageInfo };
};

export const getPathDocument = gql`
  query getPathDocument($cursor: String) {
    pages(after: $cursor, first: 50) {
      nodes {
        template {
          templateName
        }
        uri
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
