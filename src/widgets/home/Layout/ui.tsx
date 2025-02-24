import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

import { Banner } from "src/entities/Banner";
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
    <Container maxWidth="md" disableGutters>
      <Banner sx={styles.bannerMobile} width={960} height={100} />
    </Container>
    {slots?.sidebarTop && (
      <Box sx={[styles.sidebar, styles.sidebarTop]}>{slots.sidebarTop}</Box>
    )}
    <Container sx={styles.post} maxWidth="md" disableGutters>
      {children}
    </Container>
    {slots?.sidebarBottom && (
      <Box sx={[styles.sidebar, styles.sidebarBottom]} component="aside">
        {slots?.sidebarBottom}
      </Box>
    )}
  </Container>
);
