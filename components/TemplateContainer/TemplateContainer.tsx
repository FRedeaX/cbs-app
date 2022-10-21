import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

export const TemplateContainer: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Container maxWidth={false} sx={{ marginTop: "2em" }}>
    {children}
  </Container>
);
