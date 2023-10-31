import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

export type ChildrenPagePaginationGQL = {
  page: Nullable<{
    children: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: Nullable<string>;
      };
    };
  }>;
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
