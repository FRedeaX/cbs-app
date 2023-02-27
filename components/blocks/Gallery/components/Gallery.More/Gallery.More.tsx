import { Typography } from "@mui/material";
import { FC } from "react";

import classes from "./Gallery.More.module.css";

type GalleryMoreProps = {
  count: number;
};

export const GalleryMore: FC<GalleryMoreProps> = ({ count }) => (
  <div className={classes.root}>
    <Typography variant="overline" className={classes.text}>
      еще {count}
    </Typography>
  </div>
);
