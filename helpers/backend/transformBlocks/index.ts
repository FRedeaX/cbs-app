// const http = require("http");
// const sizeOf = require("image-size");
import { GalleryBlock } from "../../../components/blocks/Gallery/utils";
import { Nullable } from "../../typings/utility-types";
import removeBackslash from "../removeBackslash";
import {
  ImageTransformBlocksResult,
  imageTransformBlocks,
} from "./blocks/imageTransformBlocks";
import { getSizeOf } from "./utils/getSizeOf";

const addAttributes = (
  block: Record<string, any>,
  attributes: object,
  args?: [],
) => ({
  ...block,
  attributes: {
    ...block.attributes,
    ...attributes,
  },
  ...args,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformBlocks = async (blocks: any) => {
  if (!blocks) throw new Error("blocks of null");
  const blockList: unknown[] = [];
  const video: never[] = [];
  const promise: unknown[] = [];

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
        const galleryBlock: GalleryBlock = block;
        const imagesBlock =
          galleryBlock.attributes.images.length > 0
            ? galleryBlock.attributes.images
            : galleryBlock.innerBlocks.map((image) => image.attributes);
        const imagePromise: Promise<Nullable<ImageTransformBlocksResult>>[] =
          [];

        imagesBlock.forEach((image) => {
          imagePromise.push(imageTransformBlocks(image));
        });

        promise.push(
          Promise.all(imagePromise).then((data) => {
            blockList[index] = {
              name: galleryBlock.name,
              attributes: {
                ...galleryBlock.attributes,
                images: data.filter((image) => image !== null),
              },
            };
          }),
        );

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

  // const t = await Promise.all(p);

  // console.log(t);

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
