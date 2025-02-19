/* eslint-disable react/jsx-props-no-spreading */
import { Box } from "@mui/material";
import { FC } from "react";

import { Image, ImageProps } from "@/components/Image/Image";

export type CardMediaProps = ImageProps & {
  /**
   * Коэффициент увеличения размера изображения
   * @default 1
   */
  multipliedSize?: number;
};

export const CardMedia: FC<CardMediaProps> = ({
  alt,
  width,
  height,
  multipliedSize = 1,
  ...props
}) => (
  <Box
    sx={{
      "--image-display": `flex`,

      display: "flex",
      flexShrink: 0,
      width: `var(--card-media-width, ${width}px)`,
    }}>
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        paddingBottom: `calc(${height} / ${width} * 100%)`,
        overflow: "hidden",
      }}>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}>
        <Image
          {...props}
          style={{
            width: "inherit",
            objectFit: "cover",
          }}
          width={width * multipliedSize}
          height={height * multipliedSize}
          alt={alt}
        />
      </Box>
    </Box>
  </Box>
);
