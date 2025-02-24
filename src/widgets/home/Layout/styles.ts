import { ContainerProps, SxProps } from "@mui/material";
import { CSSSelectorObjectOrCssVariables } from "@mui/system";

/**
 * 1. Для устройств не поддерживающих display: "grid"
 */

export const root: ContainerProps["sx"] = {
  "--gap": "10px",

  paddingY: "var(--gap)",

  "@media (min-width: 1335px)": {
    display: "grid",
    gridTemplate: `
    "post sidebarTop" max-content
    "post sidebarBottom" 1fr / 1fr 340px
    `,
  },

  "@media (max-width: 1334px)": {
    "--carousel-offset-x": `calc(var(--gap) / 2)`,
  },
};

export const post: SxProps = {
  gridArea: "post",
};

export const sidebarTop: CSSSelectorObjectOrCssVariables = {
  gridArea: "sidebarTop",
};

export const sidebarBottom: CSSSelectorObjectOrCssVariables = {
  gridArea: "sidebarBottom",
};

export const sidebar: CSSSelectorObjectOrCssVariables = {
  "--carousel-button-top": "-30px",
  "--carousel-icon-button-width": "36px",
  "--carousel-icon-button-height": "36px",
  "--card-width": "288px" /* 1. */,
  "--card-media-width": "var(--card-width)",
  "--card-margin-y": "var(--gap)",
  "--card-margin-x": "calc(var(--gap) / 2)",

  "--typography-max-width":
    "calc(100% - var(--carousel-icon-button-width) * 2)",

  maxWidth: "960px" /* 1. */,
  margin: "auto" /* 1. */,

  "@media (min-width: 480px) and (max-width: 1334px)": {
    "--poster-item-width": "440px",
  },
  "@media (min-width: 1335px)": {
    height: "max-content",

    "@supports(display: grid)": {
      "--carousel-shadow-display": "none" /* 1. */,
      "--card-width": "330px" /* 1. */,

      margin: "initial" /* 1. */,
    },
  },
};

export const bannerMobile: CSSSelectorObjectOrCssVariables = {
  "@media (max-width: 1334px)": {
    display: "flex",
  },
};
