import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";

type GetPathsToPostsQuery = {
  posts: { nodes: { slug: string }[] };
};

const getPathsToPostsDocument = gql`
  query GetPathsToPostsQuery {
    posts {
      nodes {
        slug
      }
    }
  }
`;

export const clientGetPathsToPostsQuery = (
  baseOptions?: Omit<QueryOptions<never, GetPathsToPostsQuery>, "query">,
) => {
  const options = { query: getPathsToPostsDocument, ...baseOptions };
  return client.query<GetPathsToPostsQuery>(options);
};
