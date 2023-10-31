/* eslint-disable no-underscore-dangle */
import { FC } from "react";

// import { Card, ICardProps } from "../../../components/Widget/Card/Card";
import { PostCard } from "src/entities/card/Post";

import { Paragraph } from "../../../components/blocks/Paragraph/Paragraph";
import { SearchHits } from "../../../core/elastic/search/type";
import { Maybe } from "../../../helpers/typings/utility-types";

type ISearchResultListProps = { data: Maybe<SearchHits> };

export const SearchResultList: FC<ISearchResultListProps> = ({ data }) => {
  if (data === undefined) return null;

  if (data.total.value === 0) {
    return (
      <span>
        <Paragraph>Ничего не найдено</Paragraph>
      </span>
    );
  }

  return (
    <>
      {data.hits.map((node) => (
        <PostCard
          key={node?._id}
          data={{
            title:
              node.highlight?.["title.text"]?.[0] ||
              node.highlight?.title?.[0] ||
              node._source?.title,
            excerpt: node.highlight?.content?.[0] || node._source.excerpt,
            uri: new URL(node._source.link).pathname,
            featuredImage: {
              node: {
                sourceUrl: node._source.thumbnail.url,
              },
            },
            categories: {
              nodes: [...node._source.departments, ...node._source.categories],
            },
          }}
          linkProps={{ prefetch: false }}
        />
      ))}
    </>
  );
};
