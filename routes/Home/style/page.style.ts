import {
  ContainerProps,
  PaginationProps,
  TypographyProps,
} from "@mui/material";

export const sxSection: ContainerProps["sx"] = {
  "--group-cards-container-margin-x": "calc(var(--gap) / 2 * -1)",
  "--card-margin-x": "calc(var(--gap) / 2)",
  "--card-margin-y": "calc(var(--gap) / 2)",
  "@media (width > 1012px)": {
    "--carousel-button-left": "-28px",
    "--carousel-button-right": "-28px",
  },

  display: "flex",
  flexWrap: "wrap",
  paddingY: "var(--gap)",
  paddingX: "calc(var(--gap) / 2)",
};

export const sxTitle: TypographyProps["sx"] = {
  width: "100%",
};

export const sxPagination: PaginationProps["sx"] = {
  padding: "var(--gap)",
};
