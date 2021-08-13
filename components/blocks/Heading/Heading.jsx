import classNames from "classnames";
import gql from "graphql-tag";
import { createMarkup } from "~/helpers";
import classes from "./Heading.module.css";

export const headingBlockGQL = {
  fragments: gql`
    fragment headingBlockGQL on CoreHeadingBlock {
      ... on CoreHeadingBlock {
        attributes {
          ... on CoreHeadingBlockAttributes {
            anchor
            backgroundColor
            className
            content
            fontSize
            level
            textAlign
            textColor
          }
        }
      }
    }
  `,
};

export const Heading = ({
  anchor,
  backgroundColor,
  className,
  content,
  children,
  fontSize = "",
  level = 2,
  textAlign = "",
  textColor,
}) => {
  const Tag = `h${level}`;
  return (
    <Tag
      className={classNames(
        classes.block,
        classes[`level_${level}`],
        classes[`font-size_${fontSize}`],
        {
          [classes[`align_${textAlign}`]]:
            textAlign !== "" && textAlign !== "left",
        },
        className
      )}
      id={anchor}
      dangerouslySetInnerHTML={createMarkup(children || content)}
    >
      {/* {content} */}
    </Tag>
  );
};
