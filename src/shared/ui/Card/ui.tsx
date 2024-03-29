import { Box, BoxProps } from "@mui/material";
import { FC, PropsWithChildren, MouseEventHandler } from "react";

export type CardProps = Omit<BoxProps, "sx"> & {
  /** Событие при нажатии на карточу. */
  onClick?: MouseEventHandler;
  sx?: Omit<BoxProps["sx"], "flexDirection">;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  onClick,
  sx,
  ...props
}) => (
  <Box
    sx={{
      "--typography-font-family": "var(--font-family-roboto)",

      position: "relative",

      overflow: "hidden",
      display: "flex",
      flexDirection: "var(--card-direction, column)",

      width: "var(--card-width)",
      maxWidth: "var(--card-max-width)",
      margin: "var(--card-margin-y, 0) var(--card-margin-x, 0)",

      backgroundColor: "var(--card-background-color, #fff)",
      borderRadius: "var(--card-border-radius, 16px)",
      boxShadow: "rgba(30, 30, 30, 0.1) 0 2px 6px",

      transitionTimingFunction: "cubic-bezier(0.21, 0.01, 0.3, 0.07)",
      transitionDuration: "0.3s",
      transitionProperty: "transform, box-shadow",

      "@media (hover: hover)": {
        ":hover": {
          boxShadow: "rgba(62, 68, 81, 0.2) 0 3px 12px 0",
          transform: "translateY(var(--card-transform-translate-y))",
        },
      },
      ...sx,
    }}
    component="article"
    onClick={onClick}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}>
    {children}
  </Box>
);
