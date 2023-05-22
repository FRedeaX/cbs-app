import { gql } from "@apollo/client";

export type MenuItemsGQL = {
  menuItems: {
    nodes: [
      {
        childItems: {
          nodes: MenuItemsGQL[];
        };
        id: string;
        label: string;
        path: string;
        parentId: boolean;
      },
    ];
  };
};

export type MenuGQL = {
  menus: {
    nodes: MenuItemsGQL;
  };
};

const menuItemsGQL = {
  fragments: gql`
    fragment menuItemsGQL on MenuItem {
      id
      label
      path
      parentId
    }
  `,
};

const menuGQL = {
  fragments: gql`
    fragment MenuGQL on Menu {
      menuItems(where: { parentDatabaseId: 0 }) {
        nodes {
          ...menuItemsGQL
          childItems(first: 100) {
            nodes {
              ...menuItemsGQL
              childItems(first: 100) {
                nodes {
                  ...menuItemsGQL
                  childItems(first: 100) {
                    nodes {
                      ...menuItemsGQL
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ${menuItemsGQL.fragments}
  `,
};

export const FETCH_MENU = gql`
  query FetchMenu {
    menus {
      nodes {
        ...menuGQL
      }
    }
  }
  ${menuGQL.fragments}
`;
