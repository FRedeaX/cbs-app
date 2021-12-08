import classNames from "classnames";
import gql from "graphql-tag";
import { galleryBlockGQL } from "~/components/blocks/Gallery/Gallery";
import { imageBlockGQL } from "~/components/blocks/Image/Figure";
import { paragraphBlockGQL } from "~/components/blocks/Paragraph/Paragraph";
import { htmlBlockGQL } from "~/components/blocks/Html/Html";
import { verseBlockGQL } from "~/components/blocks/Verse/Verse";
import { Blocks } from "../../Blocks";
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
          ...paragraphBlockGQL
          ...galleryBlockGQL
          ...imageBlockGQL
          ...htmlBlockGQL
          ...verseBlockGQL
        }
      }
    }
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
    })}
  >
    <Blocks
      blocks={innerBlocks}
      className={{ image: classes.Image_width_max }}
    />
  </div>
);
