"use client";

import { Container } from "@mui/material";
import { FC } from "react";

import { useGetTagQuery } from "src/entities/card/Group/api";
import { PostCard } from "src/entities/card/Post";
import { PostCardList } from "src/entities/card/PostList";
import { EditTitleAndExcerpt } from "src/features/EditTitleAndExcerpt";

import { sxButton } from "./styles";

type PreviewPostCardProps = {
  id: number;
};

export const PreviewPostCard: FC<PreviewPostCardProps> = ({ id }) => {
  const { data } = useGetTagQuery(
    { id, type: "DATABASE_ID", isPreview: true },
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  if (!data?.post || data.post.tags.nodes.length) return null;

  return (
    <div sx={{ "--gap": `10px` }}>
      <Container maxWidth="md" disableGutters>
        <PostCardList>
          <PostCard
            data={data.post}
            mediaPriority
            slots={{
              content: (
                <EditTitleAndExcerpt
                  id={id}
                  title={data.post.title}
                  excerpt={data.post.excerpt}
                  buttonProps={{
                    ...(data.post.featuredImage && { sx: sxButton }),
                  }}
                />
              ),
            }}
          />
        </PostCardList>
      </Container>
    </div>
  );
};
