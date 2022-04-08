/* eslint-disable no-underscore-dangle */
import { Card } from "../../Widget/Card/Card";

interface INode {
  _id: number | string;
  highlight: {
    post_excerpt: Array<string>;
  };
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

const Suggestion = ({ nodes }: ISuggestion): JSX.Element => {
  console.log(nodes);

  return (
    <>
      {nodes.map((node: INode) => (
        <Card
          key={node?._id}
          data={{
            title: node._source.post_title,
            excerpt:
              node.highlight?.post_excerpt[0] || node._source.post_excerpt,
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
      ))}
    </>
  );
};

export default Suggestion;
