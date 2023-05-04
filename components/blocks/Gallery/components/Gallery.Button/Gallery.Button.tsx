import { FC, useCallback } from "react";

import { useCarousel } from "../../../../Carousel/Carousel.utils/useCarousel";
import {
  ImageViewerButton,
  ImageViewerButtonProps,
} from "../../../../ImageViewer/components/Button/ImageViewer.Button";
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
