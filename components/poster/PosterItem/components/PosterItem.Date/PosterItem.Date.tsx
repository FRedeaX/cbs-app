import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { SeparationDot } from "@/components/SeparationDot/SeparationDot";

import { DateEnd, DateStart } from "../../types";

import classes from "./PosterItem.Date.module.css";
import { PosterDay } from "./components/PosterDay/PosterDay";
import { PosterMonth } from "./components/PosterMonth/PosterMonth";
import { PosterTime } from "./components/PosterTime/PosterTime";

type PosterItemDateProps = {
  posterDate: {
    dateStart: DateStart;
    dateEnd: DateEnd;
    time: Nullable<string>;
  };
};

export const PosterItemDate: FC<PosterItemDateProps> = ({ posterDate }) => {
  const { dateStart, dateEnd, time } = posterDate;

  if (dateEnd.month !== null && dateStart.month !== dateEnd.month) {
    return (
      <div className={classes.root}>
        <div>
          <PosterMonth month={dateStart.monthText}>
            c <PosterDay startDay={dateStart.day} />
          </PosterMonth>
          <PosterMonth month={dateEnd.monthText}>
            по <PosterDay endDay={dateEnd.day} />
          </PosterMonth>
        </div>
        {time !== null && (
          <>
            <SeparationDot />
            <PosterTime time={time} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <PosterMonth month={dateStart.monthText}>
        <PosterDay startDay={dateStart.day} endDay={dateEnd.day} />
      </PosterMonth>
      {time !== null && (
        <>
          <SeparationDot />
          <PosterTime time={time} />
        </>
      )}
    </div>
  );
};
