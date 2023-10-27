import { ContainerProps, BoxProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--gap": "10px",

  "--is-font-size-adaptive": 0,
  "--carousel-offset-x": `calc(var(--gap) / 2)`,

  display: "flex",
  paddingY: "var(--gap)",

  "@media (max-width: 1334px)": {
    flexDirection: "column",
  },
};

export const sxAside: BoxProps["sx"] = {
  "--carousel-icon-button-width": "36px",
  "--carousel-icon-button-height": "36px",
  "--card-margin-y": "var(--gap)",
  "--card-margin-x": "calc(var(--gap) / 2)",

  "@media (min-width: 480px) and (max-width: 1334px)": {
    "--poster-item-width": "440px",
  },
  "@media (max-width: 1334px)": {
    // "--carousel-shadow-display": "none",
    "--carousel-button-top": "-35px",
    "--card-width": "288px",

    maxWidth: "960px",
    width: "100%",
    margin: "auto",
    paddingRight: `var(--gap)`,
  },
  "@media (min-width: 1335px)": {
    "--carousel-shadow-display": "none",
    "--carousel-button-top": "-30px",
    "--card-width": "330px",

    "@supports(display: grid)": {
      "--poster-item-height": "max-content",
    },

    position: "sticky",
    top: "10px",
    order: 1,
    width: "340px",
    height: "max-content",
  },
};

export const sxAsideMobile: BoxProps["sx"] = {
  "--carousel-button-top": "-41px",

  "@media (min-width: 1335px)": {
    display: "none",
  },
};

export const sxAsideIsomorphic: BoxProps["sx"] = {
  "@media (max-width: 1334px)": {
    display: "none",
  },
};
