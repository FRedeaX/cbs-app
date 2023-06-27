import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./Poster-list.module.css";

type PosterListProps = { children: ReactNode; className?: string };

export const PosterList: FC<PosterListProps> = ({ children, className }) => (
  <div className={classNames(classes.block, className)}>{children}</div>
);
