import {
  ContainerProps,
  PaginationProps,
  TypographyProps,
} from "@mui/material";

import { CardProps } from "src/shared/ui/Card/ui";

export const sxSection: ContainerProps["sx"] = {
  "--card-margin-x": "calc(var(--gap) / 2)",
  "--card-margin-y": "calc(var(--gap) / 2)",
  "--category-background": "#fff",

  "@media (min-width: 1013px)": {
    "--carousel-button-left": "-28px",
    "--carousel-button-right": "-28px",
  },

  "@media (min-width: 768px)": {
    "--card-direction": "row",
    "--card-width": "100%",
  },

  "@media (max-width: 767px)": {
    "--card-width": "calc(50% - var(--gap))",
    "--card-media-width": "auto",
  },

  "@media (max-width: 605px)": {
    "--card-width": "100%",
    "--card-max-width": "400px",
    "--card-media-width": "100%",
  },

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  paddingY: "var(--gap)",
  paddingX: "calc(var(--gap) / 2)",
};

export const sxTitle: TypographyProps["sx"] = {
  width: "100%",
  marginLeft: "calc(var(--gap) * -1)",
  paddingBottom: "calc(var(--gap) / 2)",
};

export const sxPagination: PaginationProps["sx"] = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "calc(var(--gap) * 1.5) var(--gap)",
};

export const sxCard: CardProps["sx"] = {
  "@media (min-width: 606px) and (max-width: 767px)": {
    "--card-width": "100%",
    "--card-direction": "row",
    "--card-media-width": "initial",
  },
};
