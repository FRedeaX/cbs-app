import { Fade, LinearProgress } from "@mui/material";
import { FC } from "react";

import classes from "./Search.Loader.module.css";

export const SearchLoader: FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <Fade in={isLoading}>
    <div className={classes.root}>
      <LinearProgress />
    </div>
  </Fade>
);
