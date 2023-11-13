import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const PostCardExcerpt: FC<TypographyProps> = ({ sx, ...props }) => (
  <Typography
    variant="body2"
    sx={{
      lineHeight: 1.5,
      color: `var(--black-70)`,
      fontSize: `0.875rem`,
      ...sx,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);
