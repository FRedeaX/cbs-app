import Typography from "@mui/material/Typography";
import { FC } from "react";

import { useGalleryContext } from "../../context";
import { Image } from "../Gallery.Row/Gallery.Row";
import { ImageViewerHeader } from "../ImageViewer";
import classes from "./Gallery.ViewerHeader.module.css";
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
    <ImageViewerHeader hrefDownload={images[index].url} onClose={setToggle}>
      <div className={classes.counter}>
        <Typography>{`${index + 1} / ${images.length}`}</Typography>
      </div>
    </ImageViewerHeader>
  );
};
