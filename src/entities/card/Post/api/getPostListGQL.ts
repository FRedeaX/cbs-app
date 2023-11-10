import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

import {
  PostListFieldsGQL,
  postListFieldsGQL,
} from "./postListFields.fragment";

type GetPostListQueryVariables = {
  cursor: string;
  first: number;
  tagNotIn: number[];
};

type Tag = {
  tags: {
    nodes: {
      count: number;
      description: Nullable<string>;
      id: string;
      tagId: number;
      name: string;
      slug: string;
      posts: {
        nodes: PostListFieldsGQL[];
      };
    }[];
  };
};

type GetPostListQuery<T = object> = {
  posts: {
    nodes: (PostListFieldsGQL & T & { isSticky: boolean })[];
    pageInfo: {
      endCursor: Nullable<string>;
    };
  };
};

const getPostListDocument = gql`
  query GetPostListDocument($cursor: String, $first: Int, $tagNotIn: [ID]) {
    posts(after: $cursor, first: $first, where: { tagNotIn: $tagNotIn }) {
      nodes {
        ...postListFieldsGQL
        isSticky
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
                ...postListFieldsGQL
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
  ${postListFieldsGQL.fragments}
`;

export const clientGetPostListQuery = (
  baseOptions: Omit<
    QueryOptions<GetPostListQueryVariables, GetPostListQuery<Tag>>,
    "query"
  >,
) => {
  const options = { query: getPostListDocument, ...baseOptions };
  return client.query<GetPostListQuery<Tag>, GetPostListQueryVariables>(
    options,
  );
};
