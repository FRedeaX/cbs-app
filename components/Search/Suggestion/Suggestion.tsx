/* eslint-disable no-underscore-dangle */
import { FC } from "react";
import { ISearchHitsNode } from "../../../lib/elastic";
import { Card } from "../../Widget/Card/Card";

interface ISuggestion {
  nodes: Array<ISearchHitsNode>;
}

const Suggestion: FC<ISuggestion> = ({ nodes }) => (
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
);

export default Suggestion;
