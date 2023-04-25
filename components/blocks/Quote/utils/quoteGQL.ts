import { gql } from "@apollo/client";

import { TransformBlocks } from "../../../../helpers/backend/transformBlocks/utils/type";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { embedBlockGQL } from "../../Embed/utils/embedGQL";
import { fileBlockGQL } from "../../File/utils/fileGQL";
import { galleryBlockGQL } from "../../Gallery/utils/galleryGQL";
import { headingBlockGQL } from "../../Heading/utils/headingGQL";
import { htmlBlockGQL } from "../../Html/utils/htmlGQL";
import { imageBlockGQL } from "../../Image/utils/imageGQL";
import { listBlockGQL } from "../../List/utils/listGQL";
import { paragraphBlockGQL } from "../../Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "../../Pullquote/utils/pullquoteGQL";
import { separatorBlockGQL } from "../../Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../Table/Table";
import { verseBlockGQL } from "../../Verse/utils/verseGQL";
import { videoBlockGQL } from "../../Video/utils/videoGQL";
import { HorizontalAlign } from "../../utils/types";

export type QuoteBlockGQLAttributes = {
  /**
   * Горизонтальное выравнивание содержимого.
   * Свойство `text-align`
   */
  align: Nullable<HorizontalAlign>;
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Цитирование.
   */
  citation: string;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type QuoteBlockGQL = {
  attributes: QuoteBlockGQLAttributes;
  innerBlocks: TransformBlocks[];
};

export const quoteBlockGQL = {
  fragments: gql`
    fragment quoteBlockGQL on CoreQuoteBlock {
      ... on CoreQuoteBlock {
        name
        attributes {
          ... on CoreQuoteBlockAttributes {
            align
            anchor
            citation
            className
          }
        }
        innerBlocks {
          name
          ...embedBlockGQL
          ...fileBlockGQL
          ...galleryBlockGQL
          ...headingBlockGQL
          ...htmlBlockGQL
          ...imageBlockGQL
          ...listBlockGQL
          ...paragraphBlockGQL
          ...pullquoteBlockGQL
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
    ${separatorBlockGQL.fragments}
    ${spacerBlockGQL.fragments}
    ${tableBlockGQL.fragments}
    ${verseBlockGQL.fragments}
    ${videoBlockGQL.fragments}
  `,
};
