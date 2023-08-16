import { FC, ReactNode } from "react";

import classes from "./Poster-list.module.css";

type PosterListProps = { children: ReactNode };

export const PosterList: FC<PosterListProps> = ({ children }) => (
  <div className={classes.block}>{children}</div>
);
