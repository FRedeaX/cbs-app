// const http = require("http");
// const sizeOf = require("image-size");
import https from "https";
import sizeOf from "image-size";

import removeBackslash from "../removeBackslash";

const addAttributes = (block, data) => ({
  ...block,
  attributes: {
    ...block.attributes,
    ...data,
  },
});

const getSizeOf = (url) =>
  new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(
          new Error({
            message: `getSizeOf(urlImage) statusCode= ${res.statusCode}`,
          }),
        );
      }
      const chunks = [];
      let size = {};
      res
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          try {
            const buffer = Buffer.concat(chunks);
            size = sizeOf(buffer);
          } catch (e) {
            reject(e);
          }
          resolve(size);
        });
    });
    req.on("error", (e) => {
      reject(e.message);
    });
    req.end();

    // getPlaiceholder(url).then(({ base64, img }) => {
    //   imageAttr.base64 = base64;
    //   imageAttr.img = img;
    //   resolve(imageAttr);
    // });
  });

const transform = async (arr) => {
  const blockList = [];
  const video = [];
  const promise = [];

  arr.forEach((block, index) => {
    switch (block.name) {
      case "core/image": {
        // case "core/media-text":
        const { url } = block.attributes; // || block.attributes.mediaLink;
        promise.push(
          getSizeOf(url)
            .then(({ width, height }) => {
              blockList[index] = addAttributes(block, {
                width,
                height,
              });
            })
            .catch(({ message }) => {
              blockList[index] = { name: `error: ${block.name}`, message };
            }),
        );
        break;
      }

      case "core/media-text": {
        promise.push(
          getSizeOf(block.attributes.mediaUrl)
            .then(({ width, height }) => {
              blockList[index] = addAttributes(block, {
                width,
                height,
              });
            })
            .catch(({ message }) => {
              blockList[index] = { name: `error: ${block.name}`, message };
            }),
        );
        break;
      }

      case "core/gallery": {
        const images = [];
        // const avgWidth = [];
        // const avgHeight = [];
        block.attributes.images.forEach((image, indexImg) => {
          promise.push(
            getSizeOf(image.url)
              .then((res) => {
                images[indexImg] = {
                  ...image,
                  width: res.width,
                  height: res.height,
                };
                // avgWidth.push(res.width);
                // avgHeight.push(res.height);
              })
              .catch(({ message }) => {
                blockList[index] = { name: `error: ${block.name}`, message };
              }),
          );
        });

        blockList[index] = addAttributes(block, {
          images,
          // avgWidth, //: avgWidth.reduce((acc, next) => acc + next) / avgWidth.length,
          // avgHeight, //: avgHeight.reduce((acc, next) => acc + next) / avgHeight.length,
        });
        break;
      }

      case "core/columns":
      case "core/column": {
        promise.push(
          transform(block.innerBlocks).then((res) => {
            blockList[index] = { ...block, innerBlocks: [...res.blockList] };
          }),
        );
        break;
      }

      // case "core/paragraph":
      //   return (_blocks[index] = addAttributes(block, {
      //     content: block.attributes.content
      //       .replace(/&nbsp;/g, "\u00a0")
      //       .replace(/<br>/g, "\n"),
      //   }));

      case "core/embed": {
        const url = new URL(block.attributes.url);
        const { href, host } = url;
        video.push({ id: href.slice(-4), href });

        let youtubeUrl;
        if (host.includes("youtu.be")) {
          // fetch(
          //   `https://www.googleapis.com/youtube/v3/videos?part=id&id=${id}&key=${process.env.API_YouTube}`
          // ).then((res) => {
          //   console.log(res);
          // });
          const id = url.searchParams.get("v") || removeBackslash(url.pathname);
          youtubeUrl = `https://www.youtube.com/embed/${id}?feature=oembed`;
        }

        const cls = block.attributes.className.split(" ")[0].split("-");
        blockList[index] = {
          name: block.name,
          attributes: {
            url: youtubeUrl || url.href,
            aspect: `${cls[3] || 16}-${cls[4] || 9}`,
          },
        };
        break;
      }

      case "core/quote":
      case "core/pullquote": {
        blockList[index] = addAttributes(block, {
          value: block.attributes.value
            .replace(/<p>/g, "")
            .replace(/<\/p>/g, ""),
        });
        break;
      }

      case "core/list": {
        blockList[index] = {
          name: block.name,
          attributes: {
            ...block.attributes,
            listType: block.originalContent.slice(1, 3),
          },
        };
        break;
      }

      default: {
        blockList[index] = { ...block };
        break;
      }
    }
  });

  await Promise.all(promise);
  return { blockList, video };
};

const transformBlocks = async (obj) => {
  const { blockList: blocks, video } = await transform(obj.blocks);
  return {
    ...obj,
    blocks,
    video,
  };
};

export default transformBlocks;
