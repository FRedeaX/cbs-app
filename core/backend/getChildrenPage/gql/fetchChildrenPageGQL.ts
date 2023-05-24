import { gql } from "@apollo/client";

type PostItem = {
  id: string;
  title: string;
  uri: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
};

export type FetchChildrenPageGQL = {
  title: string;
  excerpt: string;
  children: {
    nodes: PostItem[];
    pageInfo: {
      endCursor: string;
    };
  };
};

export const FETCH_CHILDREN_PAGE = gql`
  query fetchChildrenPage(
    $id: ID!
    $idType: PageIdType
    $cursor: String
    $first: Int
  ) {
    page(id: $id, idType: $idType) {
      title
      excerpt
      children(after: $cursor, first: $first) {
        nodes {
          ... on Page {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;
