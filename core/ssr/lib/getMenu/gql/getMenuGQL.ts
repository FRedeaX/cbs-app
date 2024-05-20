import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

export type GetMenuQueryVariables = {
  id:
    | "header_menu-primary"
    | "header_menu-secondary"
    | "header_menu-social"
    | "footer_menu"
    | "home_sidebar-top"
    | "home_sidebar-bottom";
};

type MenuItemsFieldsGQL = {
  id: string;
  label: string;
  path: string;
  parentId: boolean;
};

type MenuItemsGQL = {
  menuItems: {
    nodes: (MenuItemsFieldsGQL & {
      childItems: {
        nodes: MenuItemsGQL[];
      };
    })[];
  };
};

type GetMenuQuery = {
  menu: Nullable<MenuItemsGQL>;
};

const menuItemsFieldsGQL = {
  fragments: gql`
    fragment menuItemsFieldsGQL on MenuItem {
      id
      label
      path
      parentId
    }
  `,
};

const menuItemsGQL = {
  fragments: gql`
    fragment menuItemsGQL on Menu {
      menuItems(where: { parentDatabaseId: 0 }) {
        nodes {
          ...menuItemsFieldsGQL
          childItems(first: 100) {
            nodes {
              ...menuItemsFieldsGQL
              childItems(first: 100) {
                nodes {
                  ...menuItemsFieldsGQL
                  childItems(first: 100) {
                    nodes {
                      ...menuItemsFieldsGQL
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ${menuItemsFieldsGQL.fragments}
  `,
};

const getMenuDocument = gql`
  query GetMenuDocument($id: ID!) {
    menu(id: $id, idType: LOCATION) {
      ...menuItemsGQL
    }
  }
  ${menuItemsGQL.fragments}
`;

export const clientGetMenuQuery = (
  baseOptions: Omit<QueryOptions<GetMenuQueryVariables, GetMenuQuery>, "query">,
) => {
  const options = { query: getMenuDocument, ...baseOptions };
  return client.query<GetMenuQuery, GetMenuQueryVariables>(options);
};
