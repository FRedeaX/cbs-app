import classNames from "classnames";
import gql from "graphql-tag";
import classes from "./Verse.module.css";
import { createMarkup } from "~/helpers";

export const verseBlockGQL = {
  fragments: gql`
    fragment verseBlockGQL on CoreVerseBlock {
      ... on CoreVerseBlock {
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
        name
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
