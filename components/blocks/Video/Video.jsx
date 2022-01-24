/* eslint-disable jsx-a11y/media-has-caption */
import { gql } from "@apollo/client";
import classNames from "classnames";

import classes from "./Video.module.css";

export const videoBlockGQL = {
  fragments: gql`
    fragment videoBlockGQL on CoreVideoBlock {
      ... on CoreVideoBlock {
        attributes {
          preload
          src
        }
      }
    }
  `,
};

export const Video = ({ preload, src }) => (
  <div
    className={classNames(
      classes.wrapper,
      classes[`wrapper_aspect-ratio_16-9`],
    )}>
    <video
      className={classes.player}
      controls
      preload={preload}
      src={src}
      alt="YouTube видеоплеер"
    />
  </div>
);
