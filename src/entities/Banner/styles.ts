import { CSSSelectorObjectOrCssVariables } from "@mui/system";

export const root: CSSSelectorObjectOrCssVariables = {
  display: "flex",
  margin: "var(--gap)",

  "@media (max-width: 606px)": {
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
