import { gql } from "@apollo/client";

export type ImageBlockAttributes = {
  id: number;
  align: string;
  caption: string;
  alt: string;
  className: string;
  url: string;
};

export type ImageBlock = { attributes: ImageBlockAttributes };

export const imageBlockGQL = {
  fragments: gql`
    fragment imageBlockGQL on CoreImageBlock {
      ... on CoreImageBlock {
        attributes {
          ... on CoreImageBlockAttributes {
            id
            align
            caption
            alt
            className
            url
          }
        }
      }
    }
  `,
};
