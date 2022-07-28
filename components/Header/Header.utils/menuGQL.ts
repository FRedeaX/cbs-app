import { gql } from "@apollo/client";

export const menuItemsGQL = {
  fragments: gql`
    fragment menuItemsGQL on MenuItem {
      id
      label
      path
      parentId
    }
  `,
};

export const MenuGQL = {
  fragments: gql`
    fragment MenuGQL on Menu {
      menuItems(where: { parentId: "" }) {
        nodes {
          ...menuItemsGQL
          childItems {
            nodes {
              ...menuItemsGQL
              childItems {
                nodes {
                  ...menuItemsGQL
                  childItems {
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
