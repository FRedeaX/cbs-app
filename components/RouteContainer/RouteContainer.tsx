import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

type RouteContainerProps = {
  children: ReactNode;
  className?: string;
};

export const RouteContainer: FC<RouteContainerProps> = ({
  children,
  className,
}) => (
  <Container maxWidth={false} sx={{ marginTop: "2em" }} className={className}>
    {children}
  </Container>
);
