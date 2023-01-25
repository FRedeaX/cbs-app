import { ButtonBase } from "@mui/material";
import { FC, ReactNode, useCallback } from "react";

import { useCarousel } from "../../../../Carousel/Carousel.utils/useCarousel";
import { useGalleryContext } from "../../context";

type GalleryButtonProps = {
  children: ReactNode;
  index: number;
};

export const GalleryButton: FC<GalleryButtonProps> = ({ children, index }) => {
  const { setToggle } = useGalleryContext();
  const { scrollToIndex } = useCarousel();

  const hendleSetID = useCallback(() => {
    setToggle();
    scrollToIndex(index);
  }, [index, scrollToIndex, setToggle]);

  return <ButtonBase onClick={hendleSetID}>{children}</ButtonBase>;
};
