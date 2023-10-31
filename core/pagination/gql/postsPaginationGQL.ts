import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

export type PostsPaginationGQL = {
  posts: {
    nodes: {
      id: string;
      tags: {
        nodes: {
          tagID: string;
        }[];
      };
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: Nullable<string>;
    };
  };
};

export const POSTS_PAGINATION_GQL = gql`
  query postsPagination($cursor: String, $first: Int!, $tagNotIn: [ID]) {
    posts(after: $cursor, first: $first, where: { tagNotIn: $tagNotIn }) {
      nodes {
        id
        tags {
          nodes {
            tagId
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
