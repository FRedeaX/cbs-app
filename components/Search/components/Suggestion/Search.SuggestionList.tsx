/* eslint-disable no-underscore-dangle */
import { FC } from "react";

import { Maybe, Omit } from "../../../../helpers/typings/utility-types";
import { SearchHits } from "../../../../lib/elastic/type";
import { Card, ICardProps } from "../../../Widget/Card/Card";
import { Paragraph } from "../../../blocks/Paragraph/Paragraph";

type Data = { data: Maybe<SearchHits> };
type ISearchSuggestionListProps = Data & Omit<ICardProps, keyof Data>;

export const SearchSuggestionList: FC<ISearchSuggestionListProps> = ({
  data,
  ...all
}) => {
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
        <Card
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
          prefetch={false}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...all}
          // isSmall
          // isClamp
          // lineClamp={3}
        />
      ))}
    </>
  );
};
