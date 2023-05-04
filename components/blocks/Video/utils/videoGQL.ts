import { gql } from "@apollo/client";

export type VideoBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Подпись.
   */
  caption: string;
  /**
   * Атрибут `autoplay`.
   */
  autoplay: boolean;
  /**
   * Атрибут `controls`.
   */
  controls: boolean;
  /**
   * Атрибут `loop`.
   */
  loop: boolean;
  /**
   * Атрибут `muted`.
   */
  muted: boolean;
  /**
   * Атрибут `playsInline`.
   */
  playsInline: boolean;
  /**
   * Атрибут `poster`.
   */
  poster: string;
  /**
   * Атрибут `preload`.
   */
  preload: "none" | "metadata" | "auto";
  /**
   * Атрибут `src`.
   */
  src: string;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type VideoBlockGQL = {
  attributes: VideoBlockGQLAttributes;
};

export const videoBlockGQL = {
  fragments: gql`
    fragment videoBlockGQL on CoreVideoBlock {
      name
      attributes {
        ... on CoreVideoBlockAttributes {
          anchor
          caption
          autoplay
          controls
          loop
          muted
          playsInline
          poster
          preload
          src
          className
        }
      }
    }
  `,
};
