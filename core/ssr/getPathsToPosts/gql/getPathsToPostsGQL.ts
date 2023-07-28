import { gql } from "@apollo/client";

export type GetPathsToPostsGQL = {
  posts: { nodes: { slug: string }[] };
};

export const getPathsToPostsQuery = gql`
  query GetPathsToPostsQuery {
    posts {
      nodes {
        slug
      }
    }
  }
`;
