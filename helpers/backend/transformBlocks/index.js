// const http = require("http");
// const sizeOf = require("image-size");
import https from "https";
import sizeOf from "image-size";

import { getPlaceholder } from "../../../core/placeholder";
import removeBackslash from "../removeBackslash";

const addAttributes = (block, attributes, args) => ({
  ...block,
  attributes: {
    ...block.attributes,
    ...attributes,
  },
  ...args,
});

const getSizeOf = (url) =>
  new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(
          new Error({
            message: `getSizeOf(urlImage) statusCode=${res.statusCode}`,
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

export const transformBlocks = async (blocks) => {
  if (!blocks) throw new Error("blocks of null");
  const blockList = [];
  const video = [];
  const promise = [];

  blocks.forEach((block, index) => {
    switch (block.name) {
      case "core/image": {
        promise.push(
          getSizeOf(block.attributes.url)
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
          new Promise(async (resolve) => {
            try {
              const { width, height } = await getSizeOf(
                block.attributes.mediaUrl,
              );
              const { blocks: innerBlocks } = await transformBlocks(
                block.innerBlocks,
              );

              resolve(
                (blockList[index] = {
                  ...block,
                  innerBlocks,
                  attributes: {
                    ...block.attributes,
                    width,
                    height,
                  },
                }),
              );
            } catch ({ message }) {
              blockList[index] = { name: `error: ${block.name}`, message };
            }
          }),
        );
        break;
      }

      case "core/gallery": {
        const images = [];
        block.attributes.images.forEach((image, indexImg) => {
          promise.push(
            getSizeOf(image.url)
              .then(async (res) => {
                const { blurDataURL } = await getPlaceholder(image.id);

                images[indexImg] = {
                  ...image,
                  width: res.width,
                  height: res.height,
                  blurDataURL,
                };
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error);
              }),
          );
        });

        blockList[index] = addAttributes(block, { images });
        break;
      }

      case "core/columns":
      case "core/column": {
        promise.push(
          transformBlocks(block.innerBlocks).then((res) => {
            blockList[index] = { ...block, innerBlocks: [...res.blocks] };
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
        const { href, host, searchParams } = url;
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
        } else if (searchParams.has("list")) {
          youtubeUrl = `https://www.youtube.com/embed/videoseries?list=${searchParams.get(
            "list",
          )}`;
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
  return { blocks: blockList, video };
};

// const transformBlocks = async (obj) => {
//   if (!(obj && obj.blocks)) throw new Error("obj or obj.blocks of null");
//   const { blockList: blocks, video } = await transform(obj.blocks);
//   return {
//     // ...obj,
//     blocks,
//     video,
//   };
// };
