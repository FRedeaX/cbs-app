import { getPlaiceholder } from "plaiceholder";

const setProps = (blurDataURL, { src, width, height }) => ({
  src,
  width,
  height,
  blurDataURL,
});

export const plaiceholder = async (data) => {
  const _data = JSON.parse(JSON.stringify(data));
  const promise = [];

  _data.forEach((post, index) => {
    const tags = post.tags;
    if (tags !== undefined && tags.__typename === "Tag") {
      tags.posts.nodes.forEach((tagPost, tagIndex) => {
        promise.push(
          getPlaiceholder(tagPost.featuredImage.node.sourceUrl, {
            size: 10,
          }).then(
            ({ base64, img }) =>
              (_data[index].tags.posts.nodes[tagIndex].featuredImage.node =
                setProps(base64, img))
          )
        );
      });
    } else {
      promise.push(
        getPlaiceholder(post.featuredImage.node.sourceUrl, { size: 10 }).then(
          ({ base64, img }) =>
            (_data[index].featuredImage.node = setProps(base64, img))
        )
      );
    }
  });

  await Promise.all(promise);
  return _data;
};
