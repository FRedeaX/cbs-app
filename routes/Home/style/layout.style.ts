import { ContainerProps, BoxProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--gap": "10px",
  "--is-font-size-adaptive": 0,

  display: "flex",
  paddingY: "var(--gap)",

  "@media (width < 1340px)": {
    flexDirection: "column",
  },
};

export const sxAside: BoxProps["sx"] = {
  "@media (width >= 480px) and (width < 1340px)": {
    "--poster-item-width": "440px",
  },
  "@media (width < 1340px)": {
    maxWidth: "960px",
    width: "100%",
    margin: "auto",
  },
  "@media (width >= 1340px)": {
    "--carousel-shadow-display": "none",
    "--poster-item-height": "max-content",

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
