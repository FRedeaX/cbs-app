import { TabPanelProps } from "@mui/lab";
import { BoxProps } from "@mui/material";

export const sxTabList: BoxProps["sx"] = {
  paddingLeft: `var(--gap)`,
  "& .MuiTab-root": {
    fontFamily: `var(--font-family-serif)`,
    fontSize: `1.25rem`,
    color: `rgba(30, 30, 30, 0.9)`,
    textTransform: `initial`,
    paddingX: `calc(var(--gap) * 1.5)`,
  },
  "& .MuiTabs-flexContainer .Mui-selected": {
    color: `rgba(30, 30, 30, 0.9)`,
  },
};

export const sxTabPanel: TabPanelProps["sx"] = {
  padding: 0,
};
