import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

type GetResourcesQueryVariables = {
  id: string;
};

type Image = {
  node: {
    databaseId: number;
    sourceUrl: string;
  };
};

type PageFieldsGQL = {
  title: string;
  uri: string;
};

type ChildrenPageFieldsGQL = {
  id: string;
  menuOrder: Nullable<number>;
  featuredImage: Nullable<Image>;
};

type GetResourcesQuery = {
  page: Nullable<
    PageFieldsGQL & {
      children: {
        nodes: (PageFieldsGQL & ChildrenPageFieldsGQL)[];
      };
    }
  >;
};

const resourcesPageFieldsGQL = {
  fragments: gql`
    fragment resourcesPageFieldsGQL on Page {
      title
      uri
    }
  `,
};

const getResourcesDocument = gql`
  query GetResourcesDocument($id: ID!) {
    page(id: $id, idType: URI) {
      ...resourcesPageFieldsGQL
      children {
        nodes {
          ... on Page {
            ...resourcesPageFieldsGQL
            id
            menuOrder
            featuredImage {
              node {
                databaseId
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
      }
    }
  }
  ${resourcesPageFieldsGQL.fragments}
`;

export const clientGetResourcesQuery = (
  baseOptions: Omit<
    QueryOptions<GetResourcesQueryVariables, GetResourcesQuery>,
    "query"
  >,
) => {
  const options = { query: getResourcesDocument, ...baseOptions };
  return client.query<GetResourcesQuery, GetResourcesQueryVariables>(options);
};
