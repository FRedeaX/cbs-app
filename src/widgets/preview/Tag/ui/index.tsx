"use client";

import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Button } from "@mui/material";
import { FC } from "react";

import { GroupCards } from "src/entities/card/Group";
import { useGetTagQuery } from "src/entities/card/Group/api";
import { PostCard } from "src/entities/card/Post";
import { EditTitleAndExcerpt } from "src/features/EditTitleAndExcerpt";

type PreviewTagProps = {
  id: number;
};

export const PreviewTag: FC<PreviewTagProps> = ({ id }) => {
  const { data } = useGetTagQuery(
    { id, type: "DATABASE_ID", isPreview: true },
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  if (!data?.post || !data.post.tags.nodes.length) return null;

  const { tags, ...currentPost } = data.post;
  const { name, description, posts } = tags.nodes[0];

  const filtered = posts.nodes.filter(
    (item) => item.title !== currentPost.title,
  );
  filtered.unshift(currentPost);

  return (
    <div
      sx={{
        "--gap": `10px`,
        "--group-cards-transform-translate": 0,
      }}>
      <GroupCards
        title={name}
        description={description}
        items={filtered}
        renderItem={(item, index) => (
          <PostCard
            key={item.id}
            data={item}
            mediaPriority={index < 3}
            slots={{
              content: (
                <>
                  <EditTitleAndExcerpt
                    /**
                     * Используем id страницы, если это карточка текущей страницы,
                     * т.к. до публикации id или databaseId в некоторых случаях
                     * возвращает идентификатор последней ревизии.
                     */
                    id={item.id === currentPost.id ? id : item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                  />
                  <Button
                    href={item.uri}
                    target="_blank"
                    disabled={item.id === currentPost.id}
                    size="small"
                    variant="outlined"
                    sx={{ marginTop: 1 }}
                    endIcon={<OpenInNewRoundedIcon />}>
                    Открыть
                  </Button>
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};
