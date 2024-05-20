import { ReactNode } from "react";

import { HomeLayout } from "src/widgets/home/Layout";

type Layout = {
  children: ReactNode;
  sidebarTop: ReactNode;
  sidebarBottom: ReactNode;
};

const layout = async ({ children, sidebarTop, sidebarBottom }: Layout) => (
  <HomeLayout slots={{ sidebarTop, sidebarBottom }}>{children}</HomeLayout>
);

export default layout;
