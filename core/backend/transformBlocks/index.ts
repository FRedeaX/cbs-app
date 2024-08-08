import { transformDefaultBlock } from "./blocks/default/transformDefaultBlock";
import { transformEmbedBlock } from "./blocks/embed/transformEmbedBlock";
import { transformFileBlock } from "./blocks/file/transformFileBlock";
import { transformGalleryBlock } from "./blocks/gallery/transformGalleryBlock";
import { transformImageBlock } from "./blocks/image/transformImageBlock";
import { transformMediaTextBlock } from "./blocks/mediaText/transformMediaTextBlock";
import { TransformBlocks, UrlVideoByBlock } from "./utils/type";

type Result = {
  blocks: TransformBlocks[];
  videos: UrlVideoByBlock[];
};

/**
 * @param metadata Если значение равно true, то результат будет содержать минимальный набор блоков необходимый для формирования метаданных страницы.
 */
export const transformBlocks = async (
  blocks: TransformBlocks[],
  metadata = false,
): Promise<Result> => {
  const blockList: unknown[] = [];
  const videos: UrlVideoByBlock[] = [];
  const promise: unknown[] = [];

  blocks.forEach((block, index: number) => {
    switch (block.name) {
      case "core/image": {
        if (metadata) break;
        promise.push(
          transformImageBlock(block).then((data) => {
            blockList[index] = data;
          }),
        );
        break;
      }

      case "core/media-text": {
        if (metadata) break;
        promise.push(
          transformBlocks(block.innerBlocks).then((data) =>
            transformMediaTextBlock(
              block,
              data.blocks as TransformBlocks[],
            ).then((mediaTextBlock) => {
              blockList[index] = mediaTextBlock;
            }),
          ),
        );
        break;
      }

      case "core/gallery": {
        if (metadata) break;
        promise.push(
          transformGalleryBlock(block).then((data) => {
            blockList[index] = data;
          }),
        );
        break;
      }

      case "core/columns":
      case "core/column": {
        if (metadata) break;
        promise.push(
          transformBlocks(block.innerBlocks).then((data) => {
            blockList[index] = {
              ...block,
              innerBlocks: data.blocks,
            };
          }),
        );
        break;
      }

      case "core/embed": {
        if (metadata) break;
        promise.push(
          transformEmbedBlock(block).then((data) => {
            blockList[index] = data.block;
            if (data.video) videos.push(data.video);
          }),
        );
        break;
      }

      case "core/quote": {
        if (metadata) break;
        promise.push(
          transformBlocks(block.innerBlocks).then((data) => {
            blockList[index] = {
              name: block.name,
              attributes: block.attributes,
              innerBlocks: data.blocks,
            };
          }),
        );
        break;
      }

      case "core/file": {
        if (metadata) break;
        promise.push(
          transformFileBlock(block).then((data) => {
            blockList[index] = data;
          }),
        );
        break;
      }

      default: {
        blockList[index] = transformDefaultBlock(block);
        break;
      }
    }
  });
  await Promise.all(promise);
  return { blocks: blockList as TransformBlocks[], videos };
};
