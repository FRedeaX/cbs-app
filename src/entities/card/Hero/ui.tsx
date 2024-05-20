import { Typography } from "@mui/material";
import { FC } from "react";

import { VisuallyHidden } from "@/components/VisuallyHidden/VisuallyHidden";
import { Card, CardLink, CardMedia } from "src/shared/ui";

import { HeroCardItem } from "./type";

type HeroCardProps = {
  data: HeroCardItem;
};

export const HeroCard: FC<HeroCardProps> = ({
  data: { title, uri, featuredImage },
}) => (
  <Card>
    <CardLink href={uri}>
      <VisuallyHidden isHidden={!!featuredImage?.node.sourceUrl}>
        <Typography variant="h3">{title}</Typography>
      </VisuallyHidden>
      {featuredImage?.node.sourceUrl && (
        <CardMedia
          src={featuredImage.node.sourceUrl}
          alt=""
          width={330}
          height={186}
        />
      )}
    </CardLink>
  </Card>
);
