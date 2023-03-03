import { gql } from "@apollo/client";

export const galleryBlockGQL = {
  fragments: gql`
    fragment galleryBlockGQL on CoreGalleryBlock {
      ... on CoreGalleryBlock {
        name
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
      }
    }
  `,
};
