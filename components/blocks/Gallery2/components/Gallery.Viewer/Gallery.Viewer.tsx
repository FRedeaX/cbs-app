import { SwipeableDrawer } from "@mui/material";
import NextImage from "next/future/image";
import { FC } from "react";

import { noop } from "../../../../../helpers";
import { Carousel } from "../../../../Carousel/Carousel";
import { useGalleryContext } from "../../context";
import { Image } from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.Viewer.module.css";

// const sxDrawer = { width: "100vw" };

type GalleryViewerProps = {
  images: Image[];
};

export const GalleryViewer: FC<GalleryViewerProps> = ({ images }) => {
  const { isOpen, setIsOpen } = useGalleryContext();

  return (
    <SwipeableDrawer
      // sx={sxDrawer}
      anchor="bottom"
      open={isOpen}
      onOpen={noop}
      onClose={setIsOpen}
      // ModalProps={{
      //   keepMounted: false,
      // }}
      hysteresis={1}>
      <div className={classes.root}>
        <div className={classes.header} />
        <div className={classes.body}>
          <Carousel isShadow={false}>
            {images.map((image) => (
              <div key={image.id} className={classes.wrapper}>
                <NextImage
                  className={classes.image}
                  alt={image.alt}
                  src={image.url}
                  width={image.width}
                  height={image.height}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </SwipeableDrawer>
  );
};
