import { SxProps } from "@mui/material";

export const root: SxProps = {
  display: "flex",
  gap: "var(--gap)",
  margin: "var(--gap)",

  "@media (max-width: 606px)": {
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export const inner: SxProps = {
  width: "50%",
  borderRadius: "16px",
  boxShadow: "rgba(30, 30, 30, 0.1) 0 2px 6px",
  transitionTimingFunction: "cubic-bezier(0.21, 0.01, 0.3, 0.07)",
  transitionDuration: "0.3s",
  transitionProperty: "box-shadow",
  "@media (hover: hover)": {
    ":hover": {
      boxShadow: "rgba(62, 68, 81, 0.2) 0 3px 12px 0",
      cursor: "pointer",
    },
  },

  "@media (max-width: 606px)": {
    width: "max-content",
  },
};
