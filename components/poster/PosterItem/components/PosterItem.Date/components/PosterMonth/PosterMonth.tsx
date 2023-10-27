import { FC, ReactNode } from "react";

import { Date } from "@/components/poster/PosterItem/types";

import classes from "./PosterMonth.module.css";

type PosterMonthProps = {
  month: Date["monthText"];
  children: ReactNode;
};

export const PosterMonth: FC<PosterMonthProps> = ({ month, children }) => (
  <div className={classes.root}>
    {children} {month}
  </div>
);
