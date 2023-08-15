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
  "@media (min-width: 480px) and (max-width: 1339px)": {
    "--poster-item-width": "440px",
  },
  "@media (max-width: 1339px)": {
    maxWidth: "960px",
    width: "100%",
    margin: "auto",
  },
  "@media (min-width: 1340px)": {
    "--carousel-shadow-display": "none",
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
export const sxPoster: BoxProps["sx"] = {
  paddingY: "var(--gap)",
};
