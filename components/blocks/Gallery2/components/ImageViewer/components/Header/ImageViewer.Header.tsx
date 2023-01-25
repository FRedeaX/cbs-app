import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Typography } from "@mui/material";
import { FC } from "react";

import { Void } from "../../../../../../../helpers/typings/utility-types";
import classes from "./ImageViewer.Header.module.css";

type ImageViewerHeaderProps = {
  // children: ReactNode;
  badge?: string;
  hrefDownload?: string;
  onClose: Void;
};

export const ImageViewerHeader: FC<ImageViewerHeaderProps> = ({
  badge,
  hrefDownload,
  onClose,
}) => (
  <div className={classes.root}>
    {badge && (
      <div className={classes.badge}>
        <Typography>{badge}</Typography>
      </div>
    )}
    <div className={classes.controls}>
      {hrefDownload && (
        <IconButton href={hrefDownload} download target="_blank">
          <ArrowDownwardRoundedIcon />
        </IconButton>
      )}
      <IconButton onClick={onClose}>
        <CloseRoundedIcon />
      </IconButton>
    </div>
  </div>
);
