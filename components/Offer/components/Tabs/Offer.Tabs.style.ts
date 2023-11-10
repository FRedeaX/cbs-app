import { TabPanelProps } from "@mui/lab";
import { BoxProps, ContainerProps, TabProps } from "@mui/material";

export const sxOfferRoot: ContainerProps["sx"] = {
  "--transform-translate": `6px`,

  "--carousel-offset-y": `var(--transform-translate)`,
  "--carousel-offset-x": `5px`,
  "--card-width": "calc(288px)",
  "--card-margin-x": "5px",
  "--card-margin-y": "10px",
  "--card-transform-translate-y": `calc(var(--transform-translate) * -1)`,
  "--card-content-border-width": `0 1px 1px`,
  "--card-content-border-color": `var(--black-10)`,
  "--card-content-border-style": `solid`,

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

export const sxScroller: BoxProps["sx"] = {
  paddingX: `var(--card-margin-x)`,
};
