import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material-pigment-css";
import { FC } from "react";

export const PostCardTitle: FC<Omit<TypographyProps, "sx">> = (props) => (
  <Typography
    variant="h3"
    sx={{
      display: "block",
      paddingBottom: 0.5,

      fontWeight: 500,
      fontSize: `0.9375rem`,
      lineHeight: 1.3,

      ":last-child": {
        paddingBottom: 0,
      },
    }}
    {...props}
  />
);
