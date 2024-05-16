type MenuItemsGQL = {
  menuItems: {
    nodes: {
      childItems: {
        nodes: MenuItemsGQL[];
      };
      id: string;
      label: string;
      path: string;
      parentId: boolean;
    }[];
  };
};

export type Menu = MenuItemsGQL["menuItems"]["nodes"];
