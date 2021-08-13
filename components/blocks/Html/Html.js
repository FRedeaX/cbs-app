import { gql } from "@apollo/client";
import { createMarkup } from "~/helpers";

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
  <div dangerouslySetInnerHTML={createMarkup(html)} />
);
