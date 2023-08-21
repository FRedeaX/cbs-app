import { Box } from "@mui/material";
import { ReactNode, FC } from "react";

type CardContentProps = {
  children: ReactNode;
};

export const CardContent: FC<CardContentProps> = ({ children }) => (
  <Box
    sx={{
      padding: "var(--card-content-padding, 10px 18px 8px)",
    }}>
    {children}
  </Box>
);
