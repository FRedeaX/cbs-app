import { Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import {
  Pagination,
  PaginationProps,
} from "@/components/UI/Pagination/Pagination";
import { GroupCards } from "src/entities/card/Group";
import { PostCard, PostCardItem } from "src/entities/card/Post";
import { PostCardList } from "src/entities/card/PostList";

import { sxCard, sxPagination, sxTitle } from "./styles";

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
    <PostCardList>
      <Typography sx={sxTitle} variant="sectionTitle">
        {title}
      </Typography>
      {posts.map((item, index) => {
        const tag = item.tags?.nodes[0];

        if (tag !== undefined) {
          column = 0;
          return (
            <GroupCards
              key={tag.id}
              title={tag.name}
              description={tag.description}
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
        const isNextTag = posts[index + 1]?.tags?.nodes[0];
        const isLastItem = index === posts.length - 1;

        column += 1;
        return (
          <PostCard
            key={item.id}
            /**
             * Добавляем стили, если карточка расположена в первой колонке и
             * за ней следует группа карточек или это последняя карточка.
             */
            // TODO: pigment
            // cardProps={{
            //   sx: { ...(isNewRow && (isNextTag || isLastItem) && sxCard) },
            // }}
            data={item}
            mediaPriority={index < 3}
          />
        );
      })}
      {pagination && (
        <Pagination
          sx={sxPagination}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pagination}
        />
      )}
    </PostCardList>
  );
};
