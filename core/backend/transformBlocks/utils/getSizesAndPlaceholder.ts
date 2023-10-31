import { GetPlaceholderResult, getPlaceholder } from "@/core/placeholder";

import { getSizeOf } from "./getSizeOf";

type ImageTransformBlocks = {
  id: number;
  url: string;
};

export type ImageTransformBlocksResult = {
  width: number;
  height: number;
} & GetPlaceholderResult;

/**
 *
 * @param data Произвольные данные, которые будут включены в ответ.
 */
export const getSizesAndPlaceholder = async <T = Record<string, unknown>>(
  { id, url }: ImageTransformBlocks,
  data: T,
): Promise<ImageTransformBlocksResult & T> => {
  try {
    const { width, height } = await getSizeOf(url);
    const { blurDataURL } = await getPlaceholder({ id });

    return {
      ...data,
      width,
      height,
      blurDataURL,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    throw error;
  }
};
