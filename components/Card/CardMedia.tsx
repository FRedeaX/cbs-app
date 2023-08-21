/* eslint-disable react/jsx-props-no-spreading */
import { Box } from "@mui/material";
import { FC } from "react";

import { Image, ImageProps } from "@/components/Image/Image";

type CardMediaProps = Omit<ImageProps, "width" | "height">;

export const CardMedia: FC<CardMediaProps> = ({ alt, ...props }) => (
  <Box
    sx={{
      position: "relative",
      paddingBottom: "var(--card-media-padding-bottom, 56.25%)",
    }}>
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}>
      <Image {...props} width={355} height={200} alt={alt} />
    </Box>
  </Box>
);
