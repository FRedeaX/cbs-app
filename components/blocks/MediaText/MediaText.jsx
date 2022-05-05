import { gql } from "@apollo/client";
import classNames from "classnames";
import Image from "next/image";
import { useMemo } from "react";
// eslint-disable-next-line import/no-cycle
import Blocks from "../Blocks";
import { columnsBlockGQL } from "../Columns/Columns";
import { headingBlockGQL } from "../Heading/Heading";
import { Figure } from "../Image/Figure";
import { listBlockGQL } from "../List/List";
import { paragraphBlockGQL } from "../Paragraph/Paragraph";
import { quoteBlockGQL } from "../Quote/Quote";
import { verseBlockGQL } from "../Verse/Verse";
import classes from "./Media-text.module.css";

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
          }
        }
        name
        innerBlocks {
          ...paragraphBlockGQL
          ...headingBlockGQL
          ...listBlockGQL
          ...verseBlockGQL
          ...columnsBlockGQL
          ...quoteBlockGQL
        }
      }
    }
    ${paragraphBlockGQL.fragments}
    ${headingBlockGQL.fragments}
    ${listBlockGQL.fragments}
    ${verseBlockGQL.fragments}
    ${columnsBlockGQL.fragments}
    ${quoteBlockGQL.fragments}
  `,
};

export const MediaText = ({
  backgroundColor,
  gradient,
  imageFill,
  mediaAlt,
  mediaPosition,
  mediaUrl,
  mediaWidth,
  style,
  textColor,
  verticalAlignment,
  width,
  height,
  innerBlocks,
}) => {
  const background = useMemo(() => {
    if (backgroundColor !== "") return `var(--${backgroundColor})`;
    if (gradient !== "") {
      const color = gradient.split("-to-");
      if (color.length > 1)
        return `linear-gradient(135deg, var(--${color[0]}), var(--${color[1]}))`;
    } else if (style !== null) {
      const color = JSON.parse(style)?.color;
      if (color) return color.background || color.gradient;
    }
    return "";
  }, [backgroundColor, gradient, style]);

  const color = useMemo(() => {
    if (textColor !== "") return `var(--${textColor}) !impotent`;
    if (style !== null) return JSON.parse(style)?.color?.text;
    return "";
  }, [textColor, style]);

  return (
    <div
      style={{ background, color }}
      className={classNames(classes.block, {
        [classes.block_background_true]: background,
      })}>
      <div
        className={classNames(
          classes.container,
          classes[`container_mediaPosition_${mediaPosition}`],
        )}>
        <div style={{ flex: mediaWidth / 10 }} className={classes.media}>
          <Figure>
            <Image
              // style={{
              //   objectPosition: `${_focalPoint.y * 100}% ${_focalPoint.x * 100}%`,
              // }}
              src={mediaUrl}
              alt={mediaAlt}
              layout={imageFill === true ? "fill" : "intrinsic"}
              width={width}
              height={height}
              // blurDataURL={base64}
              // placeholder="blur"
              className={classes.image}
            />
          </Figure>
        </div>
        <div
          style={{ flex: (100 - mediaWidth) / 10 }}
          className={classNames(
            classes.text,
            classes[`text_padding_${mediaPosition}`],
            classes[`text_aline_${verticalAlignment}`],
          )}>
          <Blocks blocks={innerBlocks} textColor={color} />
        </div>
      </div>
    </div>
  );
};
