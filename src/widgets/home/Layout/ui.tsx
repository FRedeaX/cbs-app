import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

import { Promo } from "../Promo";
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
      <Box sx={[styles.sidebar, styles.sidebarTop]}>
        <Promo sx={styles.promoMobile} />
        {slots.sidebarTop}
      </Box>
    )}
    <Container sx={styles.post} maxWidth="md" disableGutters>
      <Promo sx={styles.promoDesktope} />
      {children}
    </Container>
    {slots?.sidebarBottom && (
      <Box sx={[styles.sidebar, styles.sidebarBottom]} component="aside">
        {slots?.sidebarBottom}
      </Box>
    )}
  </Container>
);
