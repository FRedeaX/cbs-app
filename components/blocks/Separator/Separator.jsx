import { gql } from "@apollo/client";

import classes from "./Separator.module.css";

export const separatorBlockGQL = {
  fragments: gql`
    fragment separatorBlockGQL on CoreSeparatorBlock {
      ... on CoreSeparatorBlock {
        attributes {
          anchor
          className
          color
          customColor
        }
      }
    }
  `,
};

export const Separator = ({ className, color, customColor }) => (
  <hr
    className={classes[className]}
    style={
      className === "is-style-dots"
        ? { color: color ? `var(--${color})` : `${customColor}` }
        : { backgroundColor: color ? `var(--${color})` : `${customColor}` }
    }
  />
);
