/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactElement } from "react";

import { createMarkup } from "@/helpers";
import {
  Card,
  CardContent,
  CardLink,
  CardLinkProps,
  CardMedia,
  CardProps,
} from "src/shared/ui";

import { PostCardItem } from "../type";

import { PostCardExcerpt } from "./Excerpt";
import { PostCardTitle } from "./Title";
import { Category } from "src/shared/ui/category";

export type PostCardProps = {
  data: PostCardItem;
  mediaPriority?: boolean;
  /**
   * Количество строк для усечения текста многоточием.
   */
  lineClamp?: number;
  cardProps?: Omit<CardProps, "children">;
  linkProps?: Omit<CardLinkProps, "href" | "children">;
  slots?: {
    title?: ReactElement;
    excerpt?: ReactElement;
    content?: ReactElement;
  };
};

export const PostCard: FC<PostCardProps> = ({
  data,
  mediaPriority,
  lineClamp,
  cardProps,
  linkProps,
  slots = {},
}) => {
  const title = slots.title || (
    <PostCardTitle>
      <CardLink
        href={data.uri}
        dangerouslySetInnerHTML={createMarkup(data.title)}
        {...linkProps}
      />
    </PostCardTitle>
  );

  const excerpt = slots.excerpt || (
    <PostCardExcerpt dangerouslySetInnerHTML={createMarkup(data.excerpt)} />
  );

  const content = slots.content || (
    <div
    // TODO: pigment
    // sx={{
    //   ...(lineClamp && {
    //     display: `-webkit-box`,
    //     hyphens: `auto`,
    //     overflow: `hidden`,
    //     WebkitBoxOrient: `vertical`,
    //     WebkitLineClamp: lineClamp,
    //   }),
    // }}
    >
      {title}
      {excerpt}
    </div>
  );

  return (
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
        {content}
        {data.categories && (
          <div sx={{ marginTop: "auto", zIndex: 1 }}>
            <Category.Container
              items={data.categories.nodes}
              renderItem={(item) => (
                <Category.Item key={item.id} name={item.name} uri={item.uri} />
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
