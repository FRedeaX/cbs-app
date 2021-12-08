import classNames from "classnames";
import gql from "graphql-tag";
import { Blocks } from "../Blocks";
import { Figure } from "../Image/Figure";
import { Paragraph, paragraphBlockGQL } from "../Paragraph/Paragraph";
import { columnBlockGQL } from "./../Columns/Column/Column";
import classes from "./Media-text.module.css";
import Image from "next/image";
import { useMemo } from "react";

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
        }
      }
    }
    ${paragraphBlockGQL.fragments},
  `,
};

export const MediaText = ({
  anchor,
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
    else if (gradient !== "") {
      const color = gradient.split("-to-");
      if (color.length > 1)
        return `linear-gradient(135deg, var(--${color[0]}), var(--${color[1]}))`;
    } else if (style !== null) {
      const color = JSON.parse(style)?.color;
      if (color) return color.background || color.gradient;
    }
  }, [backgroundColor, gradient, style]);

  const color = useMemo(() => {
    if (textColor !== "") return `var(--${textColor}) !impotent`;
    else if (style !== null) return JSON.parse(style)?.color?.text;
  }, [textColor, style]);

  return (
    <div
      style={{ background, color }}
      className={classNames(classes.block, {
        [classes["block_background_true"]]: background,
      })}
    >
      <div
        className={classNames(
          classes.container,
          classes[`container_mediaPosition_${mediaPosition}`]
        )}
      >
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
            classes[`text_aline_${verticalAlignment}`]
          )}
        >
          {<Blocks blocks={innerBlocks} textColor={color} />}
        </div>
      </div>
    </div>
  );
};
