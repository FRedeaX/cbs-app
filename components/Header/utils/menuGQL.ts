import { gql } from "@apollo/client";

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

const MenuGQL = {
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
        ...MenuGQL
      }
    }
  }
  ${MenuGQL.fragments}
`;
