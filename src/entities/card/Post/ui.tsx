/* eslint-disable react/jsx-props-no-spreading */
import { Typography, Box } from "@mui/material";
import { FC } from "react";

import { createMarkup } from "@/helpers";
import { Category } from "@/components/Posts/Category/Category";
import {
  Card,
  CardContent,
  CardLink,
  CardLinkProps,
  CardMedia,
  CardProps,
} from "src/shared/ui";

import { PostCardItem } from "./type";

export type PostCardProps = {
  data: PostCardItem;
  mediaPriority?: boolean;
  /**
   * Количество строк для усечения текста многоточием.
   */
  lineClamp?: number;
  cardProps?: Omit<CardProps, "children">;
  linkProps?: Omit<CardLinkProps, "href" | "children">;
};

export const PostCard: FC<PostCardProps> = ({
  data,
  mediaPriority,
  lineClamp,
  cardProps,
  linkProps,
}) => (
  <Card {...cardProps}>
    {data.featuredImage?.node.sourceUrl && (
      <CardMedia
        src={data.featuredImage.node.sourceUrl}
        alt=""
        width={288}
        height={162}
        loading={mediaPriority ? "eager" : "lazy"}
      />
    )}
    <CardContent>
      <Box
        sx={{
          ...(lineClamp && {
            display: `-webkit-box`,
            hyphens: `auto`,
            overflow: `hidden`,
            WebkitBoxOrient: `vertical`,
            WebkitLineClamp: lineClamp,
          }),
        }}>
        <CardLink href={data.uri} {...linkProps}>
          <Typography variant="h3">{data.title}</Typography>
        </CardLink>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={createMarkup(data.excerpt)}
        />
      </Box>
      {data.categories && (
        <Box sx={{ marginTop: "auto", zIndex: 1 }}>
          <Category data={data.categories.nodes} />
        </Box>
      )}
    </CardContent>
  </Card>
);
