import { gql } from "@apollo/client";

import {
  ImageBlockGQL,
  ImageBlockGQLAttributes,
  imageBlockGQL,
} from "../../Image/utils/imageGQL";

export type GalleryBlockGQLAttributes = {
  caption: string;
  className: string;
  images: ImageBlockGQLAttributes[];
};

export type GalleryBlockGQL = {
  attributes: GalleryBlockGQLAttributes;
  innerBlocks: ImageBlockGQL[];
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
