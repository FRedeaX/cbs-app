/* eslint-disable no-underscore-dangle */

import { ReactElement } from "react";
import { Card } from "../../Widget/Card/Card";

interface INode {
  _id: number | string;
  _source: {
    post_title: string;
    post_excerpt?: string;
    permalink: string;
    thumbnail: { src: string };
  };
}

interface ISuggestion {
  nodes: Array<INode>;
}

// eslint-disable-next-line arrow-body-style
const Suggestion = ({ nodes }: ISuggestion): Array<ReactElement> => {
  // console.log(nodes);

  return nodes.map((node: INode) => (
    <Card
      key={node?._id}
      data={{
        title: node._source.post_title,
        excerpt: node._source.post_excerpt,
        uri: new URL(node._source.permalink).pathname,
        featuredImage: {
          node: {
            sourceUrl: node._source.thumbnail?.src,
          },
        },
      }}
      isHorizontal
      isSmall
      isClamp
      lineClamp={2}
    />
  ));
};

export default Suggestion;
