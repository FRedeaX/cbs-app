import { Box, Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { CarouselRoot } from "@/components/Carousel/CarouselRoot";
import { Link } from "@/components/UI/Link/Link";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";
import { PosterRoot } from "@/components/poster/PosterRoot/PosterRoot";
import { Resource, ResourceCardItem } from "src/entities/card/Resource";

type AsideIsomorphicProps = {
  posters: Nullable<IPoster[]>;
  resources: Nullable<{
    title: string;
    uri: string;
    children: {
      nodes: (ResourceCardItem & { id: string })[];
    };
  }>;
};

export const AsideIsomorphic: FC<AsideIsomorphicProps> = ({
  posters,
  resources,
}) => (
  <>
    {resources && resources.children.nodes.length > 0 && (
      <Box sx={{ paddingY: "var(--gap)" }}>
        <Typography variant="sectionTitle">
          <Link href={resources.uri} underline="hover" color="inherit">
            {resources.title}
          </Link>
        </Typography>
        <CarouselRoot
          itemMargin={5}
          isButtonsOnSides={false}
          isResponsiveWidthsChildren>
          {resources.children.nodes.map((item) => (
            <Resource key={item.id} data={item} />
          ))}
        </CarouselRoot>
      </Box>
    )}
    {posters && posters.length > 0 && (
      <Box sx={{ paddingY: "var(--gap)" }}>
        <Typography variant="sectionTitle">
          <Link href="/poster" underline="hover" color="inherit">
            Анонсы
          </Link>
        </Typography>
        <PosterRoot posters={posters} />
      </Box>
    )}
  </>
);
