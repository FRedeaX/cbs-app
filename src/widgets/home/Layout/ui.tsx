import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

import * as styles from "./styles";

type HomeLayoutProps = {
  children: ReactNode;
  slots?: {
    sidebarTop?: ReactNode;
    sidebarBottom?: ReactNode;
  };
};

export const HomeLayout: FC<HomeLayoutProps> = ({ children, slots }) => (
  <Container sx={styles.root} maxWidth="lg" disableGutters>
    {slots?.sidebarTop && (
      <div sx={[styles.sidebar, styles.sidebarTop]}>{slots.sidebarTop}</div>
    )}
    <Container sx={styles.post} maxWidth="md" disableGutters>
      {children}
    </Container>
    {slots?.sidebarBottom && (
      <aside sx={[styles.sidebar, styles.sidebarBottom]}>
        {slots?.sidebarBottom}
      </aside>
    )}
  </Container>
);
