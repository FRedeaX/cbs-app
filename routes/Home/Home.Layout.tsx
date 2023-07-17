import { Box, Container, Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";
import { PosterRoot } from "@/components/poster/PosterRoot/PosterRoot";

import { sxAside, sxContainer, sxPoster } from "./style/layout.style";

type HomeLayoutProps = { children: ReactNode; posters: Nullable<IPoster[]> };

export const HomeLayout: FC<HomeLayoutProps> = ({ children, posters }) => (
  <Container sx={sxContainer} maxWidth="lg" disableGutters>
    <Box sx={sxAside} component="aside">
      {posters && posters.length > 0 && (
        <Box sx={sxPoster}>
          <Typography variant="sectionTitle">
            <Link href="/poster" passHref>
              <MUILink underline="hover" color="inherit">
                Анонсы
              </MUILink>
            </Link>
          </Typography>
          <PosterRoot posters={posters} />
        </Box>
      )}
    </Box>
    <Container maxWidth="md" disableGutters>
      {children}
    </Container>
  </Container>
);
