import classNames from "classnames";
import { Key } from "react";
import classes from "./ScheduleList.module.css";

interface IScheduleItem {
  cleanupDay?: Boolean;
  lunchBreak?: Boolean;
  day: Key;
  time: String;
}

interface IScheduleList {
  data: Array<IScheduleItem>;
  isHoliday: Boolean;
}

const ScheduleList = ({
  data,
  isHoliday,
}: IScheduleList): JSX.Element[] | null => {
  if (data === undefined || data === null) return null;

  return data.map((item) => (
    <div
      key={item.day}
      className={classNames([
        classes.item,
        {
          [classes["item--cleanup-day"]]: item.cleanupDay,
          [classes["item--lunch-break"]]: item.lunchBreak,
        },
      ])}>
      <span
        className={classNames(classes.left_column, {
          [classes.day]: isHoliday,
          [classes.weekday]: !isHoliday,
        })}>
        {item.day}
      </span>
      <span className={classes.time}>{item.time}</span>
    </div>
  ));
};

export default ScheduleList;
