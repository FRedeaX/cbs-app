import { BoxProps, ContainerProps, PaginationProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--gap": "10px",
};

export const sxHeaderBox: BoxProps["sx"] = {
  "--typography-line-height": 1,

  margin: "2em 0 1.3em",
};

export const sxCardBox: BoxProps["sx"] = {
  "--is-font-size-adaptive": 0,

  "--card-margin-x": "calc(var(--gap) / 2)",
  "--card-margin-y": "calc(var(--gap) / 2)",

  "@media (min-width: 768px)": {
    "--card-direction": "row",
    "--card-width": "100%",
  },

  "@media (max-width: 767px)": {
    "--card-width": "288px",
  },

  "@media (max-width: 605px)": {
    "--card-width": "100%",
    "--card-max-width": "400px",
    "--card-media-width": "100%",
  },

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  paddingX: "calc(var(--gap) / 2)",
};

export const sxPagination: PaginationProps["sx"] = {
  padding: "var(--gap)",
};
