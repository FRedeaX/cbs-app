import gql from "graphql-tag";
import { Paragraph } from "../Paragraph/Paragraph";
import classes from "./Quote.module.css";

export const quoteBlockGQL = {
  fragments: gql`
    fragment quoteBlockGQL on CoreQuoteBlock {
      ... on CoreQuoteBlock {
        attributes {
          ... on CoreQuoteBlockAttributes {
            align
            anchor
            citation
            className
            value
          }
        }
      }
    }
  `,
};

export const Quote = ({ align, anchor, citation, className, value }) => {
  return (
    <figure className={classes.block}>
      <blockquote className={classes.blockquote}>
        <Paragraph className={classes.p}>{value}</Paragraph>
      </blockquote>
      <figcaption className={classes.caption}>{citation}</figcaption>
    </figure>
  );
};
