import { ButtonBase } from "@mui/material";
import { FC, ReactNode, useCallback } from "react";

import { useCarouselContext } from "../../../../Carousel/Context";
import { useGalleryContext } from "../../context";

type GalleryButtonProps = {
  children: ReactNode;
  index: number;
};

export const GalleryButton: FC<GalleryButtonProps> = ({ children, index }) => {
  const { setIsOpen } = useGalleryContext();
  const { scrollToIndex } = useCarouselContext();

  const hendleSetID = useCallback(() => {
    scrollToIndex(index);
    setIsOpen();
  }, [index, scrollToIndex, setIsOpen]);

  return <ButtonBase onClick={hendleSetID}>{children}</ButtonBase>;
};
