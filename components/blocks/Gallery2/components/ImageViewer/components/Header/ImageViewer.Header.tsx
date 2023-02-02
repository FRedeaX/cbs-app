import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";

import { Void } from "../../../../../../../helpers/typings/utility-types";
import classes from "./ImageViewer.Header.module.css";

type ImageViewerHeaderProps = {
  children: ReactNode;
  hrefDownload?: string;
  onClose: Void;
};

export const ImageViewerHeader: FC<ImageViewerHeaderProps> = ({
  children,
  hrefDownload,
  onClose,
}) => (
  <div className={classes.root}>
    {children}
    <div className={classes.controls}>
      {hrefDownload && (
        <Tooltip title="Скачать изображение" arrow>
          <IconButton href={hrefDownload} download target="_blank">
            <ArrowDownwardRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Закрыть галерею" arrow>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  </div>
);
