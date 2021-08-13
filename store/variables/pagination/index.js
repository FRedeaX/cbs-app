import { gql, makeVar } from "@apollo/client";

export const paginationVar = makeVar();

export const PAGINATION_FRAGMENT = "pagination @client";
export const PAGINATION = gql`
  query GetPagination {
    ${PAGINATION_FRAGMENT}
  }
`;
