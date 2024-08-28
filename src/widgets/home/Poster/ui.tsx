import { Typography } from "@mui/material";
import { FC } from "react";

import { Link } from "@/components/UI/Link/Link";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";
import { PosterRoot } from "@/components/poster/PosterRoot/PosterRoot";

export type HomePosterProps = {
  posters: IPoster[];
};

export const HomePoster: FC<HomePosterProps> = ({ posters }) => (
  <div sx={{ paddingY: "var(--gap)" }}>
    <Typography variant="sectionTitle" noWrap>
      <Link href="/poster" underline="hover" color="inherit">
        Анонсы
      </Link>
    </Typography>
    <PosterRoot posters={posters} />
  </div>
);
