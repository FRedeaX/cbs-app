import { BoxProps } from "@mui/material";

export const sxRoot: BoxProps["sx"] = {
  position: "relative",
  display: "var(--image-display, block)",
  width: "100%",
  maxWidth: "var(--image-max-width)",
  height: "100%",
};
