import { Typography } from "@mui/material";
import { FC } from "react";

import { VisuallyHidden } from "@/components/VisuallyHidden/VisuallyHidden";
import { Card, CardLink, CardMedia } from "src/shared/ui";

import { ResourceCardItem } from "./type";

type ResourceProps = {
  data: ResourceCardItem;
};

export const Resource: FC<ResourceProps> = ({
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
          width={288}
          height={162}
        />
      )}
    </CardLink>
  </Card>
);
