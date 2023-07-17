import { memo } from "react";

import { Card } from "../Card";
import GroupCards from "../GroupCards/GroupCards";

const CardListGrouped = ({ data }) => {
  let column = 0;

  return data.map((post, index) => {
    const tags = post.tags?.nodes[0];

    if (tags !== undefined) {
      column = 0;
      return (
        <GroupCards
          key={tags.id}
          data={tags.posts.nodes}
          title={tags.name}
          description={tags.description}
          length={tags.count}
        />
      );
    }

    const isNewRow = !(column % 2);
    const nextIndex = index + 1;
    const nextPost = data[nextIndex];
    const isBig =
      isNewRow &&
      (nextPost === undefined || nextPost.tags?.nodes[0] !== undefined);

    column += 1;
    if (isBig) column = 0;
    return (
      <Card
        key={post.id}
        data={post}
        isHorizontal
        isBig={isBig}
        index={index}
      />
    );
  });
};

export default memo(CardListGrouped);
