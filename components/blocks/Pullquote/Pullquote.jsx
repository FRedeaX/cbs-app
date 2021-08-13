import gql from "graphql-tag";
import classes from "./Pullquote.module.css";

export const pullquoteBlockGQL = {
  fragments: gql`
    fragment pullquoteBlockGQL on CorePullquoteBlock {
      ... on CorePullquoteBlock {
        attributes {
          ... on CorePullquoteBlockAttributes {
            anchor
            citation
            customMainColor
            customTextColor
            textColor
            value
          }
        }
      }
    }
  `,
};

export const Pullquote = ({
  anchor,
  citation,
  customMainColor,
  customTextColor,
  textColor,
  value,
}) => {
  return (
    <figure className={classes.block}>
      <blockquote className={classes.blockquote}>
        <p className={classes.p}>{value}</p>
      </blockquote>
      <figcaption className={classes.caption}>{citation}</figcaption>
    </figure>
  );
};
