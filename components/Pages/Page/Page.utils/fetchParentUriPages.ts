import { gql } from "@apollo/client";

export const FETCH_PARENT_URI_PAGES = gql`
  query FetchParentUriPages {
    pages(first: 100, where: { status: PUBLISH, parentIn: "" }) {
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
`;
