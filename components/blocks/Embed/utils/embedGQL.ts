import { gql } from "@apollo/client";

export type EmbedBlockGQLAttributes = {
  /**
   * Подпись.
   */
  caption: string;
  /**
   * Ссылка на видео.
   */
  url: string;
  /**
   * Название видеохостинга.
   */
  providerNameSlug: string;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type EmbedBlockGQL = {
  attributes: EmbedBlockGQLAttributes;
};

export const embedBlockGQL = {
  fragments: gql`
    fragment embedBlockGQL on CoreEmbedBlock {
      ... on CoreEmbedBlock {
        name
        attributes {
          ... on CoreEmbedBlockAttributes {
            caption
            className
            providerNameSlug
            url
          }
        }
      }
    }
  `,
};
