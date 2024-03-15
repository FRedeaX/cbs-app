import { gql } from "@apollo/client";
import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { FetcherGQLData, fetcherGQLData } from "@/helpers/fetcherGQLData";
import { Nullable } from "@/helpers/typings/utility-types";
import {
  PostListFieldsGQL,
  postListFieldsGQL,
} from "src/entities/card/Post/api";

type GetTagVariables = {
  id: string | number;
  type: "DATABASE_ID" | "ID" | "SLUG" | "URI";
  isPreview?: boolean;
};

type GetTagQuery = {
  post: Nullable<
    PostListFieldsGQL & {
      tags: {
        nodes: {
          description: Nullable<string>;
          name: string;
          posts: {
            nodes: PostListFieldsGQL[];
          };
        }[];
      };
    }
  >;
};

const getTagDocument = gql`
  query GetTagDocument($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      ...postListFieldsGQL
      tags {
        nodes {
          description
          name
          posts {
            nodes {
              ...postListFieldsGQL
            }
          }
        }
      }
    }
  }
  ${postListFieldsGQL.fragments}
`;

export const useGetTagQuery = (
  variables: GetTagVariables,
  config?: SWRConfiguration<
    GetTagQuery,
    Error,
    Fetcher<GetTagQuery, FetcherGQLData<GetTagVariables>>
  >,
) =>
  useSWR<GetTagQuery, Error, FetcherGQLData<GetTagVariables>>(
    { document: getTagDocument, variables },
    fetcherGQLData,
    config,
  );
