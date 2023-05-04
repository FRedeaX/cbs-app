import { gql } from "@apollo/client";

import { AlignImage } from "../../utils/types";

export type ImageBlockGQLAttributes = {
  id: number;
  /**
   * Расположение изображения по оси `x`.
   */
  align: "" | AlignImage;
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Подпись.
   */
  caption: string;
  /**
   * Альтернативный текст.
   */
  alt: string;
  /**
   * Дополнительный класс.
   */
  className: string;
  /**
   * Ссылка на изображение.
   */
  url: string;
};

export type ImageBlockGQL = { attributes: ImageBlockGQLAttributes };

export const imageBlockGQL = {
  fragments: gql`
    fragment imageBlockGQL on CoreImageBlock {
      ... on CoreImageBlock {
        name
        attributes {
          ... on CoreImageBlockAttributes {
            id
            align
            anchor
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
