import { FC } from "react";
import { Box, CSSSelectorObjectOrCssVariables } from "@mui/system";

import ImageBanner from "@/public/banner@2025.jpg";
import { Image } from "@/components/Image";

import * as styles from "./styles";

type BannerProps = {
  sx?: CSSSelectorObjectOrCssVariables;
  width: number;
  height: number;
};

export const Banner: FC<BannerProps> = ({ sx = {}, width, height }) => {
  const alt = "Год защитника отечества";

  return (
    <Box sx={[styles.root, sx]}>
      <Image
        width={width}
        height={height}
        src={ImageBanner}
        alt={alt}
        loading="eager"
        quality={90}
      />
    </Box>
  );
};
