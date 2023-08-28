import { memo } from "react";

import { Card } from "../Card";
import { GroupCards } from "../GroupCards/GroupCards";

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
          isImagePriority={index === 0}
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
        imagePriority={index < 3}
      />
    );
  });
};

export default memo(CardListGrouped);
