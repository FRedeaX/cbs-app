import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { ResourceProps } from "@/components/Widget/Resource/Resource";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";

import { AsideIsomorphic } from "./components/Aside.Isomorphic";
import { AsideMobile } from "./components/Aside.Mobile";
import {
  sxAside,
  sxAsideIsomorphic,
  sxAsideMobile,
  sxContainer,
} from "./style/layout.style";

type HomeLayoutProps = {
  children: ReactNode;
  posters: Nullable<IPoster[]>;
  resources: Nullable<{
    title: string;
    uri: string;
    children: {
      nodes: ResourceProps[];
    };
  }>;
};

export const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  posters,
  resources,
}) => {
  const isTabs = !!posters && !!resources;

  return (
    <Container sx={sxContainer} maxWidth="lg" disableGutters>
      <Box sx={sxAside} component="aside">
        {isTabs && (
          <Box sx={sxAsideMobile}>
            <AsideMobile posters={posters} resources={resources} />
          </Box>
        )}
        <Box sx={isTabs ? sxAsideIsomorphic : {}}>
          <AsideIsomorphic posters={posters} resources={resources} />
        </Box>
      </Box>
      <Container maxWidth="md" disableGutters>
        {children}
      </Container>
    </Container>
  );
};
