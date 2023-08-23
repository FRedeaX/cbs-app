import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

import { Footer } from "@/components/Footer/Footer";
import { Header, HeaderProps } from "@/components/Header/Header";

import classes from "./Layout.module.css";

const DynamicCircularProgress = dynamic(
  () => import("@mui/material/CircularProgress"),
  {
    ssr: true,
  },
);

type LayoutProps = {
  menu: HeaderProps["menus"];
  /**
   * @default false
   */
  pageLoading?: boolean;
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({
  menu,
  pageLoading = false,
  children,
}) => (
  <>
    <Header menus={menu} />
    <main className={classes.main}>
      {pageLoading ? (
        <div className={classes.loader}>
          <DynamicCircularProgress />
        </div>
      ) : (
        children
      )}
    </main>
    <Footer className={classes.Footer} />
  </>
);
