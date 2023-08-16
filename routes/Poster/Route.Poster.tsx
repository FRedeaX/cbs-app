import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";

import { IPoster, PosterItem } from "@/components/poster/PosterItem/PosterItem";

import { sxHeaderBox, sxPosterListBox } from "./Route.Poster.style";

type RoutePosterProps = {
  posters: IPoster[];
};

export const RoutePoster: FC<RoutePosterProps> = ({ posters }) =>
  posters.length ? (
    <Container maxWidth="md">
      <Box sx={sxHeaderBox}>
        <Typography align="center" variant="h1">
          Анонсы
        </Typography>
      </Box>
      <Box sx={sxPosterListBox}>
        {posters.map((poster) => (
          <PosterItem key={poster.id} data={poster} />
        ))}
      </Box>
    </Container>
  ) : null;
