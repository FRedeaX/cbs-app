import { DocumentNode, gql } from "@apollo/client";
import useSWRMutation from "swr/mutation";

import { mutationGQLData } from "@/helpers/mutationGQLData";
import { WPGQLError } from "src/shared/api";

type UpdatePostVariables = {
  id: string | number;
  title?: string;
  excerpt?: string;
};

type UpdatePostPayload = {
  updatePost: {
    post: {
      title: string;
      excerpt: string;
    };
  };
};

const updatePostDocument = gql`
  mutation UpdatePostDocument($id: ID!, $excerpt: String, $title: String) {
    updatePost(input: { id: $id, excerpt: $excerpt, title: $title }) {
      post {
        title
        excerpt
      }
    }
  }
`;

export const useUpdatePost = () =>
  useSWRMutation<
    UpdatePostPayload,
    WPGQLError,
    { document: DocumentNode },
    UpdatePostVariables
  >({ document: updatePostDocument }, mutationGQLData);
