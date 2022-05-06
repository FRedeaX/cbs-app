import { gql } from "@apollo/client";
import { createMarkup } from "../../../helpers";
import { Paragraph } from "../Paragraph/Paragraph";
import classes from "./Quote.module.css";

export const quoteBlockGQL = {
  fragments: gql`
    fragment quoteBlockGQL on CoreQuoteBlock {
      ... on CoreQuoteBlock {
        name
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

export const Quote = ({ citation, value }) => (
  <figure className={classes.block}>
    {/* {console.log(value)} */}
    <blockquote className={classes.blockquote}>
      <Paragraph>{value}</Paragraph>
    </blockquote>
    <figcaption
      className={classes.caption}
      dangerouslySetInnerHTML={createMarkup(citation)}
    />
  </figure>
);
