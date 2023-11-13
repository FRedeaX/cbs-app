import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const PostCardTitle: FC<TypographyProps> = ({ sx, ...props }) => (
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
      ...sx,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);
