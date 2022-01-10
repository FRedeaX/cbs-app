import { getPlaiceholder } from "plaiceholder";

const setProps = (blurDataURL, { src, width, height }) => ({
  node: {
    src,
    width,
    height,
    blurDataURL,
  },
});

const setErrorProps = (src, message) => ({
  node: {
    src,
    blurDataURL: null,
    message,
  },
});

const plaiceholder = async (data) => {
  const result = JSON.parse(JSON.stringify(data));
  const promise = [];

  result.forEach((post, index) => {
    const { tags } = post;
    const postImgUrl = post.featuredImage?.node.sourceUrl || null;
    if (postImgUrl === undefined) {
      result[index] = setErrorProps(postImgUrl, "Url undefined");
      // eslint-disable-next-line no-underscore-dangle
    } else if (tags !== undefined && tags.__typename === "Tag") {
      tags.posts.nodes.forEach((tagPost, tagIndex) => {
        const tagPostImgUrl = tagPost.featuredImage.node.sourceUrl || null;
        if (tagPostImgUrl === undefined) {
          result[index].tags.posts.nodes[tagIndex].featuredImage =
            setErrorProps(tagPostImgUrl, "Url undefined");
        } else {
          promise.push(
            getPlaiceholder(tagPostImgUrl, {
              size: 10,
            })
              .then(({ base64, img }) => {
                result[index].tags.posts.nodes[tagIndex].featuredImage =
                  setProps(base64, img);
              })
              .catch(({ message }) => {
                result[index].tags.posts.nodes[tagIndex].featuredImage =
                  setErrorProps(tagPostImgUrl, message);
              }),
          );
        }
      });
    } else {
      promise.push(
        getPlaiceholder(postImgUrl, { size: 10 })
          .then(({ base64, img }) => {
            result[index].featuredImage = setProps(base64, img);
          })
          .catch(({ message }) => {
            result[index].featuredImage = setErrorProps(postImgUrl, message);
          }),
      );
    }
  });

  await Promise.all(promise);
  return result;
};
export default plaiceholder;
