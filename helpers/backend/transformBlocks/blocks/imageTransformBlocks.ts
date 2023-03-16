import { ImageBlockAttributes } from "../../../../components/blocks/Image/utils/imageGQL";
import {
  GetPlaceholderResult,
  getPlaceholder,
} from "../../../../core/placeholder";
import { Nullable } from "../../../typings/utility-types";
import { getSizeOf } from "../utils/getSizeOf";

export type ImageTransformBlocksResult = {
  width: number;
  height: number;
} & GetPlaceholderResult &
  ImageBlockAttributes;

export const imageTransformBlocks = async (
  attributes: ImageBlockAttributes,
): Promise<Nullable<ImageTransformBlocksResult>> => {
  try {
    const { width, height } = await getSizeOf(attributes.url);
    const { blurDataURL } = await getPlaceholder(attributes.id);

    return {
      ...attributes,
      width,
      height,
      blurDataURL,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return null;
  }
};
