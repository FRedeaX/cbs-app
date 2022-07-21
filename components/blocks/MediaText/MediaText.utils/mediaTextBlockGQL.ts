/* eslint-disable import/no-cycle */
import { gql } from "@apollo/client";

import { columnsBlockGQL } from "../../Columns/Columns";
import { headingBlockGQL } from "../../Heading/Heading";
import { listBlockGQL } from "../../List/List";
import { paragraphBlockGQL } from "../../Paragraph/Paragraph";
import { quoteBlockGQL } from "../../Quote/Quote";
import { verseBlockGQL } from "../../Verse/Verse";

export const mediaTextBlockGQL = {
  fragments: gql`
    fragment mediaTextBlockGQL on CoreMediaTextBlock {
      ... on CoreMediaTextBlock {
        attributes {
          ... on CoreMediaTextBlockAttributes {
            anchor
            backgroundColor
            gradient
            imageFill
            mediaAlt
            mediaPosition
            mediaUrl
            mediaWidth
            style
            textColor
            verticalAlignment
            focalPoint
            className
          }
        }
        name
        innerBlocks {
          ...paragraphBlockGQL
          ...quoteBlockGQL
          ...verseBlockGQL
          ...listBlockGQL
          ...headingBlockGQL
          ...columnsBlockGQL
        }
      }
    }
    ${paragraphBlockGQL.fragments}
    ${quoteBlockGQL.fragments}
    ${verseBlockGQL.fragments}
    ${listBlockGQL.fragments}
    ${headingBlockGQL.fragments}
    ${columnsBlockGQL.fragments}
  `,
};

/**
 * innerBlocks {
 *  ...paragraphBlockGQL +
 *  ...headingBlockGQL +
 *  ...listBlockGQL +
 *  ...quoteBlockGQL +
 *  ...columnsBlockGQL +
 *  ...groupBlockGQL -
 *  ...formatBlockGQL -
 *  ...pullquoteBlockGQL -
 *  ...verseBlockGQL +
 * }
 */
