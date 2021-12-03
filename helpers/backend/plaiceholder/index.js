import { getPlaiceholder } from "plaiceholder";

const setProps = (blurDataURL, { src, width, height }) => ({
  src,
  width,
  height,
  blurDataURL,
});

const setErrorProps = (src, message) => ({
  node: {
    src,
    blurDataURL: null,
    message,
  },
});

export const plaiceholder = async (data) => {
  const _data = JSON.parse(JSON.stringify(data));
  const promise = [];

  _data.forEach((post, index) => {
    const tags = post.tags;
    const postImgUrl = post.featuredImage?.node.sourceUrl || null;
    if (postImgUrl === undefined)
      return (_data[index].featuredImage = setErrorProps(
        postImgUrl,
        "Url undefined"
      ));

    if (tags !== undefined && tags.__typename === "Tag") {
      tags.posts.nodes.forEach((tagPost, tagIndex) => {
        const tagPostImgUrl = tagPost.featuredImage.node.sourceUrl || null;
        if (tagPostImgUrl === undefined)
          return (_data[index].tags.posts.nodes[tagIndex].featuredImage =
            setErrorProps(tagPostImgUrl, "Url undefined"));

        promise.push(
          getPlaiceholder(tagPostImgUrl, {
            size: 10,
          })
            .then(
              ({ base64, img }) =>
                (_data[index].tags.posts.nodes[tagIndex].featuredImage.node =
                  setProps(base64, img))
            )
            .catch(
              ({ message }) =>
                (_data[index].tags.posts.nodes[tagIndex].featuredImage =
                  setErrorProps(tagPostImgUrl, message))
            )
        );
      });
    } else {
      promise.push(
        getPlaiceholder(postImgUrl, { size: 10 })
          .then(
            ({ base64, img }) =>
              (_data[index].featuredImage.node = setProps(base64, img))
          )
          .catch(
            ({ message }) =>
              (_data[index].featuredImage = setErrorProps(postImgUrl, message))
          )
      );
    }
  });

  await Promise.all(promise);
  return _data;
};
