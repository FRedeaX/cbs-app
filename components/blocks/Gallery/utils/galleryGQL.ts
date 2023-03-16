import { gql } from "@apollo/client";

import {
  ImageBlock,
  ImageBlockAttributes,
  imageBlockGQL,
} from "../../Image/utils/imageGQL";

export type GalleryBlockAttributes = {
  caption: string;
  className: string;
  images: ImageBlockAttributes[];
};

export type GalleryBlock = {
  name: string;
  attributes: GalleryBlockAttributes;
  innerBlocks: ImageBlock[];
};

export const galleryBlockGQL = {
  fragments: gql`
    fragment galleryBlockGQL on CoreGalleryBlock {
      ... on CoreGalleryBlock {
        attributes {
          ... on CoreGalleryBlockAttributes {
            caption
            className
            images {
              alt
              caption
              id
              url
            }
          }
        }
        innerBlocks {
          ...imageBlockGQL
        }
      }
    }
    ${imageBlockGQL.fragments}
  `,
};
