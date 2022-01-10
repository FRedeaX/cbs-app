import { gql } from "@apollo/client";

import { createMarkup } from "../../../helpers";
import classes from "./List.module.css";

export const listBlockGQL = {
  fragments: gql`
    fragment listBlockGQL on CoreListBlock {
      ... on CoreListBlock {
        attributes {
          anchor
          className
          reversed
          start
          textColor
          values
        }
        originalContent
      }
    }
  `,
};

export const List = ({
  reversed,
  start,
  textColor,
  listType,
  values,
  children,
}) => {
  switch (listType) {
    case "ul":
      return (
        <ul
          className={classes.block}
          style={{ color: textColor ? `var(--${textColor})` : "" }}
          dangerouslySetInnerHTML={createMarkup(children || values)}
        />
      );

    case "ol":
      return (
        <ol
          start={start || 1}
          reversed={reversed}
          className={classes.block}
          style={{ color: textColor ? `var(--${textColor})` : "" }}
          dangerouslySetInnerHTML={createMarkup(children || values)}
        />
      );

    default: {
      // eslint-disable-next-line no-console
      console.error(listType);
      return null;
    }
  }
};
