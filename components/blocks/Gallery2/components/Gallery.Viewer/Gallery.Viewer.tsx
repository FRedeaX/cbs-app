import NextImage from "next/future/image";
import { FC } from "react";

import { Carousel } from "../../../../Carousel/Carousel";
import { useGalleryContext } from "../../context";
import { Image } from "../Gallery.Row/Gallery.Row";
import { GalleryViewerHeader } from "../Gallery.ViewerHeader/Gallery.ViewerHeader";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerImageWrapper,
} from "../ImageViewer";
import classes from "./Gallery.Viewer.module.css";

type GalleryViewerProps = {
  images: Image[];
};

export const GalleryViewer: FC<GalleryViewerProps> = ({ images }) => {
  const { isOpen, setToggle } = useGalleryContext();

  return (
    <ImageViewer open={isOpen} onClose={setToggle}>
      <GalleryViewerHeader images={images} />
      <ImageViewerBody>
        <Carousel isShadow={false}>
          {images.map((image) => (
            <ImageViewerImageWrapper key={image.id}>
              <NextImage
                className={classes.image}
                alt={image.alt}
                src={image.url}
                width={image.width}
                height={image.height}
                sizes="100vw"
              />
            </ImageViewerImageWrapper>
          ))}
        </Carousel>
      </ImageViewerBody>
    </ImageViewer>
  );
};
