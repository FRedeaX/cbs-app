import { FC } from "react";

import { useGalleryContext } from "../../context";
import { Image } from "../Gallery.Row/Gallery.Row";
import { ImageViewerHeader } from "../ImageViewer";
import { useGalleryViewerHeader } from "./useGalleryViewerHeader";

type GalleryViewerHeaderProps = {
  images: Image[];
};

export const GalleryViewerHeader: FC<GalleryViewerHeaderProps> = ({
  images,
}) => {
  const { setToggle } = useGalleryContext();
  const index = useGalleryViewerHeader();

  return (
    <ImageViewerHeader
      badge={`${index + 1} / ${images.length}`}
      hrefDownload={images[index].url}
      onClose={setToggle}
    />
  );
};
