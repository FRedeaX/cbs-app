/* eslint-disable no-underscore-dangle */
import { Card } from "../../Widget/Card/Card";

interface INode {
  _id: number | string;
  highlight: {
    content: Array<string>;
    title: Array<string>;
  };
  _source: {
    title: string;
    excerpt?: string;
    link: string;
    thumbnail: { url: string };
  };
}

interface ISuggestion {
  nodes: Array<INode>;
}

const Suggestion = ({ nodes }: ISuggestion): JSX.Element => {
  return (
    <>
      {nodes.map((node: INode) => (
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
