/* eslint-disable no-underscore-dangle */
import { FC } from "react";
import { ISearchHitsNode } from "../../../lib/elastic";
import { Card } from "../../Widget/Card/Card";

const SuggestionList: FC<{ nodes?: Array<ISearchHitsNode> }> = ({ nodes }) =>
  nodes && nodes.length > 0 ? (
    <>
      {nodes.map((node: ISearchHitsNode) => (
        <Card
          key={node?._id}
          data={{
            title: node.highlight?.title?.[0] || node._source.title,
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
          lineClamp={2}
        />
      ))}
    </>
  ) : null;

export default SuggestionList;
