import { ContainerProps, BoxProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--gap": "10px",
  "--is-font-size-adaptive": 0,

  display: "flex",
  paddingY: "var(--gap)",

  "@media (max-width: 1339px)": {
    flexDirection: "column",
  },
};

export const sxAside: BoxProps["sx"] = {
  "--carousel-icon-button-width": "36px",
  "--carousel-icon-button-height": "36px",
  "--card-margin-y": "10px",
  "--card-margin-x": "5px",

  "@media (min-width: 480px) and (max-width: 1339px)": {
    "--poster-item-width": "440px",
  },
  "@media (max-width: 1339px)": {
    // "--carousel-shadow-display": "none",
    "--carousel-button-top": "-35px",
    "--card-width": "280px",

    maxWidth: "960px",
    width: "100%",
    margin: "auto",
  },
  "@media (min-width: 1340px)": {
    "--carousel-shadow-display": "none",
    "--carousel-button-top": "-30px",
    "--card-width": "330px",

    "@supports(display: grid)": {
      "--poster-item-height": "max-content",
    },

    position: "sticky",
    top: "10px",
    order: 1,
    width: "345px",
    height: "max-content",
  },
};

export const sxAsideMobile: BoxProps["sx"] = {
  "--carousel-button-top": "-41px",

  "@media (min-width: 1340px)": {
    display: "none",
  },
};

export const sxAsideIsomorphic: BoxProps["sx"] = {
  "@media (max-width: 1339px)": {
    display: "none",
  },
};
