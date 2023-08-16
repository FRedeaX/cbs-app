import { gql } from "@apollo/client";

import { DeepMergeTwoTypes } from "@/helpers/typings/utility-types";

import { PostFieldsGQL, postFieldsGQL } from "../../getPosts/gql/postListGQL";

export type CategoryFieldsGQL = {
  categories: {
    nodes: {
      slug: string;
    }[];
  };
};

export type PostsByCategoryQuery = {
  category: {
    posts: {
      nodes: DeepMergeTwoTypes<CategoryFieldsGQL, PostFieldsGQL>[];
      pageInfo: {
        endCursor: string;
      };
    };
  };
};

export const postsByCategoryQuery = gql`
  query PostsByCategory($id: ID!, $cursor: String, $first: Int!) {
    category(id: $id, idType: SLUG) {
      posts(after: $cursor, first: $first) {
        nodes {
          ...postFieldsGQL
          categories {
            nodes {
              slug
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
  ${postFieldsGQL.fragments}
`;
