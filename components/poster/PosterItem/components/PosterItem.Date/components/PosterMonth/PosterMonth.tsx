import { FC, ReactNode } from "react";

import classes from "./PosterMonth.module.css";
import { DateEnd, DateStart } from "@/components/poster/PosterItem/types";

type PosterMonthProps = {
  month: DateStart["monthText"] | DateEnd["monthText"];
  children: ReactNode;
};

export const PosterMonth: FC<PosterMonthProps> = ({ month, children }) => (
  <div className={classes.root}>
    {children} {month}
  </div>
);
