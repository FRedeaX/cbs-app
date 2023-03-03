import Typography from "@mui/material/Typography";
import { FC } from "react";

import { ImageViewerHeader } from "../../../../ImageViewer";
import { useGalleryContext } from "../../context";
import { ImageData } from "../Gallery.Row/Gallery.Row";
import classes from "./Gallery.ViewerHeader.module.css";
import { useGalleryViewerHeader } from "./useGalleryViewerHeader";

type GalleryViewerHeaderProps = {
  images: ImageData[];
};

export const GalleryViewerHeader: FC<GalleryViewerHeaderProps> = ({
  images,
}) => {
  const { setToggle } = useGalleryContext();
  const index = useGalleryViewerHeader();

  return (
    <ImageViewerHeader
      hrefDownload={index !== null ? images[index].url : undefined}
      onClose={setToggle}>
      {index !== null ? (
        <div className={classes.counter}>
          <Typography>{`${index + 1} / ${images.length}`}</Typography>
        </div>
      ) : null}
    </ImageViewerHeader>
  );
};
