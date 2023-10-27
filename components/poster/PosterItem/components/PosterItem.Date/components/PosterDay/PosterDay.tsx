import classNames from "classnames";
import { FC } from "react";

import { Date } from "@/components/poster/PosterItem/types";

import classes from "./PosterDay.module.css";

type PosterDayProps = {
  startDay?: Date["day"];
  endDay?: Date["day"];
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

  return (
    <span
      className={classNames(classes.root, {
        [classes.root_range]: startDay && endDay,
      })}>
      {rangeDays || day}
    </span>
  );
};
