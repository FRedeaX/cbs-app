import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

import { Void } from "@/helpers/typings/utility-types";

import classes from "./ImageViewer.Header.module.css";

const DynamicTooltip = dynamic(() => import("@mui/material/Tooltip"), {
  ssr: true,
});

type ImageViewerHeaderProps = {
  children?: ReactNode;
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
        <DynamicTooltip title="Скачать изображение" arrow>
          <IconButton href={hrefDownload} download target="_blank">
            <ArrowDownwardRoundedIcon />
          </IconButton>
        </DynamicTooltip>
      )}
      <DynamicTooltip title="Закрыть" arrow>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DynamicTooltip>
    </div>
  </div>
);
