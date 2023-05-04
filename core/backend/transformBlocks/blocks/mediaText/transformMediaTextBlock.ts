import {
  MediaTextBlockGQL,
  MediaTextBlockGQLAttributes,
} from "../../../../../components/blocks/MediaText/utils/mediaTextBlockGQL";
import {
  ImageTransformBlocksResult,
  getSizesAndPlaceholder,
} from "../../utils/getSizesAndPlaceholder";
import { TransformBlocks, TransformErrorBlock } from "../../utils/type";

export type TransformMediaTextBlock = {
  attributes: MediaTextBlockGQLAttributes & ImageTransformBlocksResult;
  innerBlocks: TransformBlocks[];
};

export const transformMediaTextBlock = async (
  mediaTextBlock: TransformBlocks<MediaTextBlockGQL>,
  innerBlocks: TransformBlocks[],
): Promise<TransformBlocks<TransformMediaTextBlock | TransformErrorBlock>> => {
  try {
    const attributes = await getSizesAndPlaceholder(
      {
        id: mediaTextBlock.attributes.mediaId,
        url: mediaTextBlock.attributes.mediaUrl,
      },
      mediaTextBlock.attributes,
    );

    return {
      name: mediaTextBlock.name,
      attributes,
      innerBlocks,
    };
  } catch (error) {
    return {
      name: `error: ${mediaTextBlock.name}`,
      message: JSON.stringify(error),
      attributes: null,
      innerBlocks: null,
    };
  }
};
