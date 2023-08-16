import { FC } from "react";

import classes from "./PosterDay.module.css";
import { DateEnd, DateStart } from "@/components/poster/PosterItem/types";

type PosterDayProps = {
  startDay?: DateStart["day"];
  endDay?: DateEnd["day"];
};

export const PosterDay: FC<PosterDayProps> = ({ startDay, endDay }) => {
  const day = startDay ?? endDay;
  let rangeDays = "";

  if (day === undefined) return null;

  if (endDay) {
    if (startDay) {
      rangeDays += `${startDay}-`;
    }
    rangeDays += endDay;
  }

  return <span className={classes.root}>{rangeDays || day}</span>;
};
