import { GalleryBlockGQL } from "../../../../../components/blocks/Gallery/utils/galleryGQL";
import { getSizesAndPlaceholder } from "../../utils/getSizesAndPlaceholder";
import { TransformBlocks, TransformErrorBlock } from "../../utils/type";
import { TransformImageBlockAttributes } from "../image/transformImageBlock";

export type TransformGalleryBlock = {
  attributes: {
    caption: string;
    className: string;
    images: TransformImageBlockAttributes[];
  };
};

export const transformGalleryBlock = async (
  galleryBlock: TransformBlocks<GalleryBlockGQL>,
): Promise<TransformBlocks<TransformGalleryBlock | TransformErrorBlock>> => {
  const imagesBlock =
    galleryBlock.attributes.images.length > 0
      ? galleryBlock.attributes.images
      : galleryBlock.innerBlocks.map((image) => image.attributes);
  const imagePromise: Promise<TransformImageBlockAttributes>[] = [];

  imagesBlock.forEach((image) => {
    imagePromise.push(
      getSizesAndPlaceholder({ id: image.id, url: image.url }, image),
    );
  });

  try {
    const images = await Promise.allSettled(imagePromise);

    return {
      name: galleryBlock.name,
      attributes: {
        ...galleryBlock.attributes,
        images: images
          .filter((image) => image.status === "fulfilled")
          .map(
            (image) =>
              (image as PromiseFulfilledResult<TransformImageBlockAttributes>)
                .value,
          ),
      },
    };
  } catch (error) {
    return {
      name: `error: ${galleryBlock.name}`,
      message: JSON.stringify(error),
      attributes: null,
      innerBlocks: null,
    };
  }
};
