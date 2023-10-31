import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";
import { ResourceCardItem } from "src/entities/card/Resource";

import { AsideIsomorphic } from "./AsideIsomorphic";
import { AsideMobile } from "./AsideMobile";
import {
  sxAside,
  sxAsideIsomorphic,
  sxAsideMobile,
  sxContainer,
} from "./styles";

type HomeLayoutProps = {
  children: ReactNode;
  posters: Nullable<IPoster[]>;
  resources: Nullable<{
    title: string;
    uri: string;
    children: {
      nodes: (ResourceCardItem & { id: string })[];
    };
  }>;
};

export const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  posters,
  resources,
}) => {
  const isTabs =
    posters &&
    posters.length > 0 &&
    resources &&
    resources.children.nodes.length > 0;

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
