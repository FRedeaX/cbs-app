import { BoxProps, ContainerProps, PaginationProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--gap": "10px",
};

export const sxHeaderBox: BoxProps["sx"] = {
  "--typography-line-height": 1,

  margin: "2em 0 1.3em",
};

export const sxCardBox: BoxProps["sx"] = {
  "--card-margin-x": "calc(var(--gap) / 2)",
  "--card-margin-y": "calc(var(--gap) / 2)",

  display: "flex",
  flexWrap: "wrap",
  paddingX: "calc(var(--gap) / 2)",
};

export const sxPagination: PaginationProps["sx"] = {
  padding: "var(--gap)",
};
