import { gql } from "@apollo/client";

import classes from "./Html.module.css";

export const htmlBlockGQL = {
  fragments: gql`
    fragment htmlBlockGQL on CoreHtmlBlock {
      ... on CoreHtmlBlock {
        saveContent
      }
    }
  `,
};

export const Html = ({ html }) => (
  <div className={classes.block} dangerouslySetInnerHTML={{ __html: html }} />
);
