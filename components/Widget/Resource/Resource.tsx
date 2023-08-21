import { Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { VisuallyHidden } from "@/components/VisuallyHidden/VisuallyHidden";

import { Card } from "../../Card/Card";
import { CardLink } from "../../Card/CardLink";
import { CardMedia } from "../../Card/CardMedia";

export type ResourceProps = {
  title: string;
  uri: string;
  featuredImage: Nullable<{
    node: {
      sourceUrl: string;
      blurDataURL?: string;
    };
  }>;
};

export const Resource: FC<ResourceProps> = ({ title, uri, featuredImage }) => (
  <Card>
    <CardLink href={uri}>
      <VisuallyHidden isHidden={!!featuredImage?.node.sourceUrl}>
        <Typography variant="h3">{title}</Typography>
      </VisuallyHidden>
      {featuredImage?.node.sourceUrl && (
        <CardMedia src={featuredImage.node.sourceUrl} alt="" />
      )}
    </CardLink>
  </Card>
);
