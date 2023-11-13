import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

export type PostListFieldsGQL = {
  id: string;
  uri: string;
  title: string;
  excerpt: string;
  categories: {
    nodes: { id: string; name: string; uri: string }[];
  };
  featuredImage: Nullable<{
    node: { databaseId: number; sourceUrl: string };
  }>;
};

export const postListFieldsGQL = {
  fragments: gql`
    fragment postListFieldsGQL on Post {
      id
      uri
      title
      excerpt
      categories {
        nodes {
          id
          name
          uri
        }
      }
      featuredImage {
        node {
          databaseId
          sourceUrl(size: THUMBNAIL)
        }
      }
    }
  `,
};
