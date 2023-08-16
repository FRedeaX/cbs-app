import { gql } from "@apollo/client";

export type PostsPaginationByCategoryGQL = {
  category: {
    posts: {
      nodes: {
        id: string;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
};

export const POSTS_PAGINATION_BY_CATEGORY_GQL = gql`
  query postsPaginationByCategory($id: ID!, $cursor: String, $first: Int!) {
    category(id: $id, idType: SLUG) {
      posts(after: $cursor, first: $first) {
        nodes {
          id
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
