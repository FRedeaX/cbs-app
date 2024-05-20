import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

type GetWidgetQueryVariables = {
  id: string;
};

type Image = {
  node: {
    databaseId: number;
    sourceUrl: string;
  };
};

type PageFieldsGQL = {
  id: string;
  uri: string;
};

type TemplatePageFieldsGQL = {
  template: {
    templateName: string;
    sidebar: {
      order: string;
    };
  };
};

type ChildrenPageFieldsGQL = {
  title: string;
  excerpt: string;
  menuOrder: Nullable<number>;
  featuredImage: Nullable<Image>;
};

type GetWidgetQuery = {
  page: Nullable<
    PageFieldsGQL &
      TemplatePageFieldsGQL & {
        children: {
          nodes: (PageFieldsGQL & ChildrenPageFieldsGQL)[];
        };
      }
  >;
};

const widgetPageFieldsGQL = {
  fragments: gql`
    fragment widgetPageFieldsGQL on Page {
      id
      uri
    }
  `,
};

const getWidgetDocument = gql`
  query getBGDDocument($id: ID!) {
    page(id: $id, idType: URI) {
      ...widgetPageFieldsGQL
      template {
        ... on Template_Widget {
          templateName
          sidebar {
            order
          }
        }
        ... on Template_WidgetWithDeteiled {
          templateName
          sidebar {
            order
          }
        }
      }
      children {
        nodes {
          ... on Page {
            ...widgetPageFieldsGQL
            title
            excerpt
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
  ${widgetPageFieldsGQL.fragments}
`;

export const clientGetWidgetQuery = (
  baseOptions: Omit<
    QueryOptions<GetWidgetQueryVariables, GetWidgetQuery>,
    "query"
  >,
) => {
  const options = {
    query: getWidgetDocument,
    ...baseOptions,
  };
  return client.query<GetWidgetQuery, GetWidgetQueryVariables>(options);
};
