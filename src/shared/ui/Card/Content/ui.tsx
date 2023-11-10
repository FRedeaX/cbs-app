import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type CardContentProps = {
  children: ReactNode;
};

export const CardContent: FC<CardContentProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,

      padding: "var(--card-content-padding, 10px 18px 8px)",
      borderWidth: "var(--card-content-border-width)",
      borderColor: "var(--card-content-border-color)",
      borderStyle: "var(--card-content-border-style)",
    }}>
    {children}
  </Box>
);
