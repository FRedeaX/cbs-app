import { FC, useCallback } from "react";

import { useCarousel } from "@/components/Carousel";
import {
  ImageViewerButton,
  ImageViewerButtonProps,
} from "@/components/ImageViewer";

import { useGalleryContext } from "../../context";

type GalleryButtonProps = {
  index: number;
} & ImageViewerButtonProps;

export const GalleryButton: FC<GalleryButtonProps> = ({
  children,
  className,
  index,
}) => {
  const { setToggle } = useGalleryContext();
  const { scrollToIndex } = useCarousel();

  const handleOnClick = useCallback(() => {
    setToggle();
    scrollToIndex(index);
  }, [index, scrollToIndex, setToggle]);

  return (
    <ImageViewerButton
      className={className}
      onClick={handleOnClick}
      aria-label="Открыть изображение">
      {children}
    </ImageViewerButton>
  );
};
