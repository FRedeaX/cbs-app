import { Container, Typography } from "@mui/material";
import { FC } from "react";

import { IPoster, PosterItem } from "@/components/poster/PosterItem/PosterItem";

import { sxHeaderBox, sxPosterListBox } from "./Route.Poster.style";

type RoutePosterProps = {
  posters: IPoster[];
};

export const RoutePoster: FC<RoutePosterProps> = ({ posters }) =>
  posters.length ? (
    <Container maxWidth="md">
      <div sx={sxHeaderBox}>
        <Typography align="center" variant="h1">
          Анонсы
        </Typography>
      </div>
      <div sx={sxPosterListBox}>
        {posters.map((poster) => (
          <PosterItem key={poster.id} data={poster} />
        ))}
      </div>
    </Container>
  ) : null;
