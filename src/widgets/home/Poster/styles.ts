import { CSSSelectorObjectOrCssVariables } from "@mui/system";

export const root: CSSSelectorObjectOrCssVariables = {
  paddingY: "var(--gap)",
};

export const rootOneItem: CSSSelectorObjectOrCssVariables = {
  "@media (max-width: 480px)": {
    "--poster-item-width": "calc(100% - var(--gap)* 2)",
    "--poster-item-max-width": "400px",
  },
};
