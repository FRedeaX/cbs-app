import { gql } from "@apollo/client";

import { TransformBlocks } from "../../../../helpers/backend/transformBlocks/utils/type";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { embedBlockGQL } from "../../Embed/utils/embedGQL";
import { fileBlockGQL } from "../../File/utils/fileGQL";
import { galleryBlockGQL } from "../../Gallery/utils";
import { headingBlockGQL } from "../../Heading/Heading";
import { htmlBlockGQL } from "../../Html/Html";
import { imageBlockGQL } from "../../Image/utils/imageGQL";
import { listBlockGQL } from "../../List/utils/listGQL";
import { paragraphBlockGQL } from "../../Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "../../Pullquote/utils/pullquoteGQL";
import { quoteBlockGQL } from "../../Quote/utils/quoteGQL";
import { separatorBlockGQL } from "../../Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../Table/Table";
import { verseBlockGQL } from "../../Verse/utils/verseGQL";
import { videoBlockGQL } from "../../Video/utils/videoGQL";
import {
  Color,
  FontSize,
  Gradient,
  VerticalAlignment,
} from "../../utils/types";

export type СolumnBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Вертикальное выравнивание `innerBlocks` (по оси `y`).
   */
  verticalAlignment: "" | VerticalAlignment;
  /**
   * Ширина столбца.
   */
  width: string;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type СolumnBlockGQL = {
  attributes: СolumnBlockGQLAttributes;
  innerBlocks: TransformBlocks[];
};

export type СolumnsBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Группировать друг над другом на мобильных устройствах.
   */
  isStackedOnMobile: string;

  fontSize: "" | FontSize;
  textColor: "" | Color;
  backgroundColor: "" | Color;
  gradient: "" | Gradient;
  borderColor: "" | Color;
  style: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type СolumnsBlockGQL = {
  attributes: СolumnsBlockGQLAttributes;
  innerBlocks: СolumnBlockGQL[];
};

export const columnBlockGQL = {
  fragments: gql`
    fragment columnBlockGQL on CoreColumnBlock {
      ... on CoreColumnBlock {
        name
        attributes {
          ... on CoreColumnBlockAttributes {
            anchor
            verticalAlignment
            width
            className
          }
        }
        innerBlocks {
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

export const columnsBlockGQL = {
  fragments: gql`
    fragment columnsBlockGQL on CoreColumnsBlock {
      ... on CoreColumnsBlock {
        name
        attributes {
          ... on CoreColumnsBlockAttributes {
            anchor
            backgroundColor
            borderColor
            className
            fontSize
            gradient
            isStackedOnMobile
            style
            textColor
          }
        }
        innerBlocks {
          ...columnBlockGQL
        }
      }
    }
    ${columnBlockGQL.fragments}
  `,
};
