import { gql } from "@apollo/client";

import { Nullable } from "../../../../helpers/typings/utility-types";
import { columnsBlockGQL } from "../../Columns/utils/columnsGQL";
import { embedBlockGQL } from "../../Embed/utils/embedGQL";
import { fileBlockGQL } from "../../File/utils/fileGQL";
import { galleryBlockGQL } from "../../Gallery/utils/galleryGQL";
import { headingBlockGQL } from "../../Heading/utils/headingGQL";
import { htmlBlockGQL } from "../../Html/utils/htmlGQL";
import { imageBlockGQL } from "../../Image/utils/imageGQL";
import { listBlockGQL } from "../../List/utils/listGQL";
import { paragraphBlockGQL } from "../../Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "../../Pullquote/utils/pullquoteGQL";
import { quoteBlockGQL } from "../../Quote/utils/quoteGQL";
import { separatorBlockGQL } from "../../Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../Table/utils/tableGQL";
import { verseBlockGQL } from "../../Verse/utils/verseGQL";
import { videoBlockGQL } from "../../Video/utils/videoGQL";
import {
  Color,
  FontSize,
  Gradient,
  HorizontalMediaAlign,
  VerticalAlignment,
} from "../../utils/types";

export type MediaTextBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;

  fontSize: "" | FontSize;
  textColor: "" | Color;
  backgroundColor: "" | Color;
  gradient: "" | Gradient;
  style: Nullable<string>;

  /**
   * Свойство `object-fit`.
   */
  imageFill: boolean;
  /**
   * Свойство `object-position`.
   *
   * JSON
   * @example
   * {
   *    x: number;
   *    y: number
   * }
   */
  focalPoint: Nullable<string>;
  mediaAlt: string;
  mediaId: number;
  mediaUrl: string;
  mediaWidth: number;
  mediaPosition: HorizontalMediaAlign;
  /**
   * Вертикальное выравнивание (по оси `y`).
   */
  verticalAlignment: "" | VerticalAlignment;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type MediaTextBlockGQL = {
  attributes: MediaTextBlockGQLAttributes;
  innerBlocks: [];
};

export const mediaTextBlockGQL = {
  fragments: gql`
    fragment mediaTextBlockGQL on CoreMediaTextBlock {
      ... on CoreMediaTextBlock {
        name
        attributes {
          ... on CoreMediaTextBlockAttributes {
            anchor
            textColor
            backgroundColor
            gradient
            imageFill
            focalPoint
            fontSize
            mediaAlt
            mediaId
            mediaPosition
            mediaUrl
            mediaWidth
            verticalAlignment
            style
            className
          }
        }
        innerBlocks {
          name
          ...columnsBlockGQL
          ...embedBlockGQL
          ...fileBlockGQL
          ...galleryBlockGQL
          ...headingBlockGQL
          ...htmlBlockGQL
          ...imageBlockGQL
          ...listBlockGQL
          ...paragraphBlockGQL
          ...pullquoteBlockGQL
          ...quoteBlockGQL
          ...separatorBlockGQL
          ...spacerBlockGQL
          ...tableBlockGQL
          ...verseBlockGQL
          ...videoBlockGQL
        }
      }
    }
    ${columnsBlockGQL.fragments}
    ${embedBlockGQL.fragments}
    ${fileBlockGQL.fragments}
    ${galleryBlockGQL.fragments}
    ${headingBlockGQL.fragments}
    ${htmlBlockGQL.fragments}
    ${imageBlockGQL.fragments}
    ${listBlockGQL.fragments}
    ${paragraphBlockGQL.fragments}
    ${pullquoteBlockGQL.fragments}
    ${quoteBlockGQL.fragments}
    ${separatorBlockGQL.fragments}
    ${spacerBlockGQL.fragments}
    ${tableBlockGQL.fragments}
    ${verseBlockGQL.fragments}
    ${videoBlockGQL.fragments}
  `,
};
