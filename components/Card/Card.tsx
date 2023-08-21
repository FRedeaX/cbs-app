import { Box } from "@mui/material";
import { ReactNode, FC } from "react";

type CardProps = {
  children: ReactNode;
  /**
   * @default "column"
   */
  direction?: "column" | "row";
};

export const Card: FC<CardProps> = ({ children, direction = "column" }) => (
  <Box
    sx={{
      "--typography-font-family": "var(--font-family-roboto)",
      "--typography-font-size": "15px",
      "--typography-font-weight": 500,
      "--typography-line-height": "21px",

      position: "relative",

      overflow: "hidden",
      display: "flex",
      flexDirection: `var(--card-direction, ${direction})`,

      width: "var(--card-width)",
      maxWidth: "var(--card-max-width)",
      margin: "var(--card-margin-y) var(--card-margin-x)",

      backgroundColor: "var(--card-background-color, #fff)",
      borderRadius: "var(--card-border-radius, 16px)",
      boxShadow: "rgba(30, 30, 30, 10%) 0 2px 6px",

      transition: "box-shadow 0.3s cubic-bezier(0.21, 0.01, 0.3, 0.07)",

      "@media (hover: hover)": {
        ":hover": {
          boxShadow: "rgba(62, 68, 81, 20%) 0 3px 12px 0",
        },
      },
    }}
    component="article">
    {children}
  </Box>
);
