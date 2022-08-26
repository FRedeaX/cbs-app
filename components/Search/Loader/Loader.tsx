import { Fade, LinearProgress } from "@mui/material";
import { FC } from "react";

import classes from "./Loader.module.css";

export const Loader: FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <Fade in={isLoading}>
    <div className={classes.root}>
      <LinearProgress />
    </div>
  </Fade>
);
