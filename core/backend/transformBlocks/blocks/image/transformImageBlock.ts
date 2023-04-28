import {
  ImageBlockGQL,
  ImageBlockGQLAttributes,
} from "../../../../../components/blocks/Image/utils/imageGQL";
import {
  ImageTransformBlocksResult,
  getSizesAndPlaceholder,
} from "../../utils/getSizesAndPlaceholder";
import { TransformBlocks, TransformErrorBlock } from "../../utils/type";

export type TransformImageBlockAttributes = ImageBlockGQLAttributes &
  ImageTransformBlocksResult;

export type TransformImageBlock = {
  attributes: TransformImageBlockAttributes;
};

export const transformImageBlock = async (
  imageBlock: TransformBlocks<ImageBlockGQL>,
): Promise<TransformBlocks<TransformImageBlock | TransformErrorBlock>> => {
  try {
    const image = await getSizesAndPlaceholder(
      {
        id: imageBlock.attributes.id,
        url: imageBlock.attributes.url,
      },
      imageBlock.attributes,
    );

    return {
      name: imageBlock.name,
      attributes: image,
    };
  } catch (error) {
    return {
      name: `error: ${imageBlock.name}`,
      message: JSON.stringify(error),
      attributes: null,
      innerBlocks: null,
    };
  }
};
