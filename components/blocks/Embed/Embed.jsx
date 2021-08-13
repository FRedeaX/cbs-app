import { gql } from "@apollo/client";
import classNames from "classnames";
import classes from "./Embed.module.css";

export const embedBlockGQL = {
  fragments: gql`
    fragment embedBlockGQL on CoreEmbedBlock {
      ... on CoreEmbedBlock {
        attributes {
          ... on CoreEmbedBlockAttributes {
            className
            url
          }
        }
      }
    }
  `,
};

export const Embed = ({ aspect, url }) => {
  return (
    <div
      className={classNames(
        classes.wrapper,
        classes[`wrapper_aspect-ratio_${aspect}`]
      )}
    >
      <iframe
        className={classes.iframe}
        loading="lazy"
        width="560"
        height="315"
        src={url}
        // title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
