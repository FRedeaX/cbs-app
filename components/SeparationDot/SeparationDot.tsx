import { FC } from "react";

import classes from "./SeparationDot.module.css";

export const SeparationDot: FC = () => (
  <span className={classes.root} aria-hidden>
    •
  </span>
);
