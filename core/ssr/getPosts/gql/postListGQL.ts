import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

type Category = {
  id: string;
  name: string;
  uri: string;
};

type Image = {
  node: {
    databaseId: number;
    sourceUrl: string;
  };
};

export type PostFieldsGQL = {
  id: string;
  isSticky: boolean;
  title: string;
  uri: string;
  categories: {
    nodes: Category[];
  };
  excerpt: string;
  featuredImage: Nullable<Image>;
};

export type PostListQuery = {
  posts: {
    nodes: (PostFieldsGQL & {
      tags: {
        nodes: {
          count: number;
          description: Nullable<string>;
          id: string;
          tagId: number;
          name: string;
          slug: string;
          posts: {
            nodes: PostFieldsGQL[];
          };
        }[];
      };
    })[];
    pageInfo: {
      endCursor: Nullable<string>;
    };
  };
};

export const postFieldsGQL = {
  fragments: gql`
    fragment postFieldsGQL on Post {
      id
      isSticky
      title
      uri
      categories {
        nodes {
          id
          name
          uri
        }
      }
      excerpt
      featuredImage {
        node {
          databaseId
          sourceUrl(size: THUMBNAIL)
        }
      }
    }
  `,
};

export const postListQuery = gql`
  query PostList($cursor: String, $first: Int, $tagNotIn: [ID]) {
    posts(after: $cursor, first: $first, where: { tagNotIn: $tagNotIn }) {
      nodes {
        ...postFieldsGQL
        tags {
          nodes {
            count
            description
            id
            tagId
            name
            slug
            posts {
              nodes {
                ...postFieldsGQL
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
  ${postFieldsGQL.fragments}
`;
