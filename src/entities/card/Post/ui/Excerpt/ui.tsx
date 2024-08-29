import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const PostCardExcerpt: FC<Omit<TypographyProps, "sx">> = (props) => (
  <Typography
    variant="body2"
    sx={{
      lineHeight: 1.5,
      color: `var(--black-70)`,
      fontSize: `0.875rem`,
    }}
    {...props}
  />
);
