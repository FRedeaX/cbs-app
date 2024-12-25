"use client";

import { FC } from "react";
import { Box, SxProps } from "@mui/system";

import ImageAnons from "@/public/Анонс-мероприятий@20241220.jpg";
import ImageWork from "@/public/График-работы@20241220.jpg";
import ImageAnonsFull from "@/public/Анонс-мероприятий.jpg";
import ImageWorkFull from "@/public/График-работы.jpg";
import { useToggle } from "@/helpers/frontend/hooks";
import { Image } from "@/components/Image";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerButton,
  ImageViewerFigure,
  ImageViewerHeader,
  ImageViewerZoom,
} from "@/components/ImageViewer";

import * as styles from "./styles";

type PromoProps = {
  sx: SxProps;
};

export const Promo: FC<PromoProps> = ({ sx }) => {
  const [isOpenAnons, setToggleAnons] = useToggle(false);
  const altAnons = "Анонс мероприятий на январские праздничные дни";
  const [isOpenWork, setToggleWork] = useToggle(false);
  const altWork = "Анонс мероприятий на январские праздничные дни";

  return (
    // @ts-ignore
    <Box sx={[styles.root, sx]}>
      <Box sx={styles.inner}>
        <ImageViewerButton onClick={setToggleWork}>
          <Image
            width={475}
            height={100}
            src={ImageWork}
            alt={altWork}
            loading="eager"
          />
        </ImageViewerButton>
        <ImageViewer open={isOpenWork} onClose={setToggleWork}>
          <ImageViewerHeader onClose={setToggleWork} />
          <ImageViewerBody>
            <ImageViewerFigure width={950} height={100}>
              <ImageViewerZoom>
                <Image
                  alt={altWork}
                  src={ImageWorkFull}
                  width={3000}
                  height={1561}
                  loading="lazy"
                />
              </ImageViewerZoom>
            </ImageViewerFigure>
          </ImageViewerBody>
        </ImageViewer>
      </Box>

      <Box sx={styles.inner}>
        <ImageViewerButton onClick={setToggleAnons}>
          <Image
            width={475}
            height={100}
            src={ImageAnons}
            alt={altAnons}
            loading="eager"
          />
        </ImageViewerButton>
        <ImageViewer open={isOpenAnons} onClose={setToggleAnons}>
          <ImageViewerHeader onClose={setToggleAnons} />
          <ImageViewerBody>
            <ImageViewerFigure width={950} height={100}>
              <ImageViewerZoom>
                <Image
                  alt={altAnons}
                  src={ImageAnonsFull}
                  width={3000}
                  height={1500}
                  loading="lazy"
                />
              </ImageViewerZoom>
            </ImageViewerFigure>
          </ImageViewerBody>
        </ImageViewer>
      </Box>
    </Box>
  );
};
