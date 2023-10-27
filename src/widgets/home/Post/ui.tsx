import { Box, Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import {
  Pagination,
  PaginationProps,
} from "@/components/UI/Pagination/Pagination";
import { PostCard, PostCardItem } from "src/entities/card/Post";

import { GroupCards } from "./GroupCards/ui";
import { sxCard, sxPagination, sxSection, sxTitle } from "./styles";

type CardItem = PostCardItem & {
  id: string;
};

type HomePostProps = {
  title: string;
  posts: (CardItem & {
    tags?: {
      nodes: {
        id: string;
        name: string;
        description: Nullable<string>;
        posts: { nodes: CardItem[] };
      }[];
    };
  })[];
  pagination?: Nullable<PaginationProps>;
};

export const HomePost: FC<HomePostProps> = ({ title, posts, pagination }) => {
  let column = 0;

  return (
    <Box sx={sxSection} component="section">
      <Typography sx={sxTitle} variant="sectionTitle">
        {title}
      </Typography>
      {posts.map((item, index) => {
        const tag = item.tags?.nodes.at(0);

        if (tag !== undefined) {
          column = 0;
          return (
            <GroupCards
              key={tag.id}
              title={tag.name}
              description={tag.name}
              items={tag.posts.nodes}
              renderItem={(tagItem, tagIndex) => (
                <PostCard
                  key={tagItem.id}
                  data={tagItem}
                  mediaPriority={index === 0 && tagIndex < 3}
                />
              )}
            />
          );
        }

        const isNewRow = !(column % 2);
        const isNextTag = posts[index + 1]?.tags?.nodes.at(0);
        const isLastItem = index === posts.length - 1;

        column += 1;
        return (
          <PostCard
            key={item.id}
            /**
             * Добавляем стили, если карточка расположена в первой колонке и
             * за ней следует группа карточек или это последняя карточка.
             */
            cardProps={{
              sx: { ...(isNewRow && (isNextTag || isLastItem) && sxCard) },
            }}
            data={item}
            mediaPriority={index < 3}
          />
        );
      })}
      {pagination && (
        <Pagination
          sx={sxPagination}
          count={pagination.count}
          uri={pagination.uri}
        />
      )}
    </Box>
  );
};
