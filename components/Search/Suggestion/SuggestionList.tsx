/* eslint-disable no-underscore-dangle */
import { FC } from "react";

import { ISearchHits, ISearchHitsNode } from "../../../lib/elastic";
import { Card } from "../../Widget/Card/Card";
import { Paragraph } from "../../blocks/Paragraph/Paragraph";

const SuggestionList: FC<{
  data: ISearchHits | undefined;
}> = ({ data }) => {
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
      {data.hits.map((node: ISearchHitsNode) => (
        <Card
          key={node?._id}
          data={{
            title:
              node.highlight?.["title.text"]?.[0] ||
              node.highlight?.title?.[0] ||
              node._source.title,
            excerpt: node.highlight?.content?.[0] || node._source.excerpt,
            uri: new URL(node._source.link).pathname,
            featuredImage: {
              node: {
                sourceUrl: node._source.thumbnail.url,
              },
            },
          }}
          prefetch={false}
          isHorizontal
          isSmall
          isClamp
          lineClamp={3}
        />
      ))}
    </>
  );
};

export default SuggestionList;
