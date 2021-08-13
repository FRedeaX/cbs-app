// const http = require("http");
// const sizeOf = require("image-size");
import http from "http";
import sizeOf from "image-size";
import { removeBackslash } from "~/helpers/backend";

export const transformBlocks = async (obj) => ({
  ...obj,
  blocks: await transform(obj.blocks),
});

const transform = async (arr) => {
  let _blocks = [];
  const promise = [];

  arr.forEach((block, index) => {
    switch (block.name) {
      case "core/image": {
        // case "core/media-text":
        const url = block.attributes.url; // || block.attributes.mediaLink;
        promise.push(
          getSizeOf(url)
            .then(
              ({ width, height }) =>
                (_blocks[index] = addAttributes(block, {
                  width,
                  height,
                }))
            )
            .catch(
              ({ message }) =>
                (_blocks[index] = { name: `error: ${block.name}`, message })
            )
        );

        // promise.push(
        //   getPlaiceholder(url).then(
        //     ({ base64, img }) =>
        //       (_blocks[index] = addAttributes(block, { base64, img }))
        //   )
        // );

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
              .catch(
                ({ message }) =>
                  (_blocks[index] = { name: `error: ${block.name}`, message })
              )
          );
        });

        return (_blocks[index] = addAttributes(block, {
          images,
          // avgWidth, //: avgWidth.reduce((acc, next) => acc + next) / avgWidth.length,
          // avgHeight, //: avgHeight.reduce((acc, next) => acc + next) / avgHeight.length,
        }));
      }

      case "core/columns":
      case "core/column": {
        return promise.push(
          transform(block.innerBlocks).then(
            (res) => (_blocks[index] = { ...block, innerBlocks: [...res] })
          )
        );
      }

      // case "core/paragraph":
      //   return (_blocks[index] = addAttributes(block, {
      //     content: block.attributes.content
      //       .replace(/&nbsp;/g, "\u00a0")
      //       .replace(/<br>/g, "\n"),
      //   }));

      case "core/embed": {
        const url = new URL(block.attributes.url);
        const id =
          url.searchParams.get("v") ||
          removeBackslash(url.pathname) ||
          undefined;
        if (id === undefined) return null;

        // fetch(
        //   `https://www.googleapis.com/youtube/v3/videos?part=id&id=${id}&key=${process.env.API_YouTube}`
        // ).then((res) => {
        //   console.log(res);
        // });
        const cls = block.attributes.className.split(" ")[0].split("-");
        return (_blocks[index] = {
          name: block.name,
          attributes: {
            url: `https://www.youtube.com/embed/${id}?feature=oembed`,
            aspect: `${cls[3] || 16}-${cls[4] || 9}`,
          },
        });
      }

      case "core/quote":
      case "core/pullquote":
        return (_blocks[index] = addAttributes(block, {
          value: block.attributes.value
            .replace(/<p>/g, "")
            .replace(/<\/p>/g, ""),
        }));

      case "core/list":
        return (_blocks[index] = {
          name: block.name,
          attributes: {
            ...block.attributes,
            listType: block.originalContent.slice(1, 3),
          },
        });

      default: {
        return (_blocks[index] = { ...block });
      }
    }
  });

  await Promise.all(promise);
  return _blocks;
};

const addAttributes = (block, data) => ({
  ...block,
  attributes: {
    ...block.attributes,
    ...data,
  },
});

const getSizeOf = (url) =>
  new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject({
          message: `getSizeOf(urlImage) statusCode= ${res.statusCode}`,
        });
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
