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

/**
 * Preview фрагмент
 */
type PostPreviewFieldsGQL = {
  /**
   * Для обновления лучше использовать databaseId (wordpress) вместо id (GraphQL),
   * т.к. до публикации id в некоторых случаях не соответствует типу записи.
   */
  databaseId: number;
  /**
   * Если текущий узел (запись) является ревизией (в предварительном просмотре),
   * в этом поле отображается узел, для которого это ревизия.
   * Возвращает значение null, если запись не является ревизией.
   */
  revisionOf: Nullable<{
    node: {
      id: string;
    };
  }>;
};

const postPreviewFieldsGQL = {
  fragments: gql`
    fragment postPreviewFieldsGQL on Post {
      databaseId
      revisionOf {
        node {
          id
        }
      }
    }
  `,
};

type PostFieldsGQL = PostListFieldsGQL & PostPreviewFieldsGQL;

type GetTagQuery = {
  post: PostFieldsGQL & {
    tags: {
      nodes: {
        description: Nullable<string>;
        name: string;
        posts: {
          nodes: PostFieldsGQL[];
        };
      }[];
    };
  };
};

const getTagDocument = gql`
  query GetTagDocument($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      ...postListFieldsGQL
      ...postPreviewFieldsGQL
      tags {
        nodes {
          description
          name
          posts {
            nodes {
              ...postListFieldsGQL
              ...postPreviewFieldsGQL
            }
          }
        }
      }
    }
  }
  ${postListFieldsGQL.fragments}
  ${postPreviewFieldsGQL.fragments}
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
