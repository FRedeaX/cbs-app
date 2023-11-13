import {
  PaginationProps,
  TypographyProps,
} from "@mui/material";

import { CardProps } from "src/shared/ui/Card/ui";

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
