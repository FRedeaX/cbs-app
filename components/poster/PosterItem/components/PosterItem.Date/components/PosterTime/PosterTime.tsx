import { FC } from "react";

import classes from "./PosterTime.module.css";

type PosterTimeProps = {
  time: string;
};

export const PosterTime: FC<PosterTimeProps> = ({ time }) => (
  <div className={classes.root}>{time}</div>
);
