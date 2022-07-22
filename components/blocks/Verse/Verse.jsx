import { gql } from "@apollo/client";
import classNames from "classnames";

import { createMarkup } from "../../../helpers";
import classes from "./Verse.module.css";

export const verseBlockGQL = {
  fragments: gql`
    fragment verseBlockGQL on CoreVerseBlock {
      ... on CoreVerseBlock {
        name
        attributes {
          ... on CoreVerseBlockAttributes {
            anchor
            className
            content
            fontSize
            textAlign
            textColor
          }
        }
      }
    }
  `,
};

export const Verse = ({
  anchor,
  className,
  content,
  fontSize,
  textAlign,
  textColor,
}) => {
  const style = {};
  if (fontSize) style.fontSize = fontSize;
  if (textColor) style.textColor = textColor;

  return (
    <pre
      id={anchor || ""}
      style={style}
      className={classNames(classes.block, className, {
        [classes[`align_${textAlign}`]]:
          textAlign !== undefined && textAlign !== "" && textAlign !== "left",
      })}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
};
