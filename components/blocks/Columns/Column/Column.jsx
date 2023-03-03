import { gql } from "@apollo/client";
import classNames from "classnames";

// eslint-disable-next-line import/no-cycle
import Blocks from "../../Blocks";
import { galleryBlockGQL } from "../../Gallery/utils";
import { headingBlockGQL } from "../../Heading/Heading";
import { htmlBlockGQL } from "../../Html/Html";
import { imageBlockGQL } from "../../Image/Figure";
import { paragraphBlockGQL } from "../../Paragraph/Paragraph";
import { verseBlockGQL } from "../../Verse/Verse";
import classes from "./Column.module.css";

export const columnBlockGQL = {
  fragments: gql`
    fragment columnBlockGQL on CoreColumnBlock {
      ... on CoreColumnBlock {
        attributes {
          ... on CoreColumnBlockAttributes {
            width
            verticalAlignment
            className
            anchor
          }
        }
        name
        innerBlocks {
          ...headingBlockGQL
          ...paragraphBlockGQL
          ...galleryBlockGQL
          ...imageBlockGQL
          ...htmlBlockGQL
          ...verseBlockGQL
        }
      }
    }
    ${headingBlockGQL.fragments}
    ${paragraphBlockGQL.fragments}
    ${galleryBlockGQL.fragments}
    ${imageBlockGQL.fragments}
    ${htmlBlockGQL.fragments}
    ${verseBlockGQL.fragments}
  `,
};

export const Column = ({
  attributes: { width, verticalAlignment },
  innerBlocks,
}) => (
  <div
    style={{
      flexBasis: width,
    }}
    className={classNames(classes.wrapper, {
      [classes[`align_${verticalAlignment}`]]:
        verticalAlignment !== undefined && verticalAlignment !== "",
    })}>
    <Blocks
      blocks={innerBlocks}
      className={{ image: classes.Image_width_max }}
    />
  </div>
);
