import { gql } from "@apollo/client";

export const FETCH_CHILDREN_URI_PAGES = gql`
  query FetchChildrenUriPages($pathname: ID!) {
    page(id: $pathname, idType: URI) {
      children(first: 100) {
        edges {
          node {
            slug
            template {
              templateName
            }
          }
        }
      }
    }
  }
`;
