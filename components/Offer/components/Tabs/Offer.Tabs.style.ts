import { TabPanelProps } from "@mui/lab";
import { BoxProps, ContainerProps, TabProps } from "@mui/material";

export const sxOfferRoot: ContainerProps["sx"] = {
  "--card-margin-x": "5px",
  "--card-width": "calc(288px + var(--card-margin-x) * 2)",
  "--card-info-border-right": "1px solid var(--black-10)",
  "--card-info-border-bottom": "1px solid var(--black-10)",
  "--card-info-border-left": "1px solid var(--black-10)",

  marginTop: "var(--offer-margin-top)",
  marginBottom: "var(--offer-margin-bottom)",
  backgroundColor: "white",
  boxShadow: "0 2px 6px rgba(30,30,30,.1)",
  borderRadius: {
    md: "20px",
  },
  overflow: "hidden",
};

export const sxOfferHeader: BoxProps["sx"] = {
  borderBottom: 1,
  borderBottomColor: "divider",
  margin: "0 10px 10px",
};

export const sxOfferTab: TabProps["sx"] = { whiteSpace: "pre-line" };

export const sxOfferTabPanel: TabPanelProps["sx"] = { padding: 0 };
