import { ImageTransformBlocksResult } from "../blocks/imageTransformBlocks";

export type TransformBlocks<T = never> = {
  name: string;
  message?: string;
} & T;

export type TransformGalleryBlock = {
  attributes: {
    caption: string;
    className: string;
    images: ImageTransformBlocksResult[];
  };
};
