/* eslint-disable no-underscore-dangle */
import { memo } from "react";

import Card from "../Card/Card";
import GroupCards from "../GroupCards/GroupCards";

const PostAndGroupCards = ({ data }) => {
  // const arrTags = [];
  let column = 0;

  return data.map((post, index) => {
    const { tags } = post;

    if (tags.__typename === "Tag") {
      // const tag = arrTags.find((tagID) => tagID === tags.id);
      // if (tag) return null;
      // arrTags.push(tags.id);
      column = 0;
      return (
        // <>
        //   {tags.tagId}
        <GroupCards
          key={tags.id}
          data={tags.posts.nodes}
          title={tags.name}
          description={tags.description}
          length={tags.count}
        />
        // </>
      );
    }

    const isNewRow = !(column % 2);
    const nextIndex = index + 1;
    const nextPost = data[nextIndex];
    const isBig =
      isNewRow &&
      (nextPost === undefined || nextPost.tags.__typename === "Tag");
    column += 1;
    if (isBig) column = 0;
    return (
      <Card key={post.id} data={post} horizontal isBig={isBig} index={index} />
    );
  });

  // return data.map((post) => {
  //   const tags = post.tags.nodes[0];
  //   const isNewRow = !(index % 2);

  //   if (tags) {
  //     const tag = arrTags.find((tagID) => tagID.tags.id === tags.id);
  //     if (tag) return null;

  //     arrTags.push({ isSkipped: !isNewRow, tags: tags });

  //     if (!isNewRow && isTwoColumns) return null;

  //     indexIncrement(false);
  //     return (
  //       <GroupCardsContainer
  //         key={tags.id}
  //         postsByTag={filterPostsByTag(tags)}
  //         tags={tags}
  //       />
  //     );
  //   }

  //   return (
  //     <Fragment key={`${post.id}-${index}`}>
  //       {indexIncrement(true)}
  //       <Card key={post.id} data={post} horizontal={true} />
  //       {!isNewRow &&
  //         isTwoColumns &&
  //         arrTags.map((skippedTag) => {
  //           return (
  //             skippedTag.isSkipped && (
  //               <Fragment key={`${skippedTag.tags.id}-${index}`}>
  //                 <GroupCardsContainer
  //                   key={skippedTag.tags.id}
  //                   postsByTag={filterPostsByTag(skippedTag.tags)}
  //                   tags={skippedTag.tags}
  //                 />
  //                 {(skippedTag.isSkipped = false)}
  //                 {indexIncrement(false)}
  //               </Fragment>
  //             )
  //           );
  //         })}
  //     </Fragment>
  //   );
  // });
};

export default memo(PostAndGroupCards);
