import { gql } from "@apollo/client";

export type ChildrenPagePaginationGQL = {
  page: {
    children: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
};

export const CHILDREN_PAGE_PAGINATION = gql`
  query childrenPagePagination($id: ID!, $cursor: String, $first: Int) {
    page(id: $id, idType: URI) {
      children(after: $cursor, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
