/* eslint-disable react/destructuring-assignment */
import { Typography } from "@mui/material";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

import LibraryButton from "../../LibraryButton/LibraryButton";
import classesInfo from "../Contact-info.module.css";

import classes from "./Schedule.module.css";
import ScheduleList from "./ScheduleList/ScheduleList";

const FILIAL_DEFAULT = "cgb";
const SCHEDULE_DEFAULT = "default";
const SCHEDULE_AUP = "aup";

const Schedule = (props) => {
  const searchParams = useSearchParams();
  const lib = searchParams.get("lib");
  const schedule = searchParams.get("schedule");
  const holiday = searchParams.get("holiday");

  return (
    <div className={classesInfo.info}>
      <div className={classes.header}>
        <div style={{ display: "flex" }}>
          <Typography
            component="h3"
            className={classNames(classesInfo.title, classes.title)}>
            График работы
          </Typography>
          {(props.scheduleSecondary.schedule ||
            props.scheduleSecondary.scheduleAup) && (
            <div className={classes.controls}>
              <LibraryButton
                href={{
                  pathname: "/biblioteki",
                  query: {
                    lib: lib || FILIAL_DEFAULT,
                    schedule: schedule || SCHEDULE_DEFAULT,
                    holiday: false,
                  },
                }}
                isActive={holiday === "false" || holiday === undefined}
                className={classes.link}>
                Обычный
              </LibraryButton>
              <LibraryButton
                href={{
                  pathname: "/biblioteki",
                  query: {
                    lib: lib || FILIAL_DEFAULT,
                    schedule: schedule || SCHEDULE_DEFAULT,
                    holiday: true,
                  },
                }}
                isActive={holiday === "true"}>
                Праздничный
              </LibraryButton>
            </div>
          )}
        </div>

        <div className={classes.controls}>
          <LibraryButton
            href={{
              pathname: "/biblioteki",
              query: {
                lib: lib || FILIAL_DEFAULT,
                schedule: SCHEDULE_DEFAULT,
                holiday: holiday || false,
              },
            }}
            isActive={schedule === SCHEDULE_DEFAULT || schedule === undefined}
            className={classes.link}>
            Для читателей
          </LibraryButton>
          <LibraryButton
            href={{
              pathname: "/biblioteki",
              query: {
                lib: lib || FILIAL_DEFAULT,
                schedule: SCHEDULE_AUP,
                holiday: holiday || false,
              },
            }}
            isActive={schedule === SCHEDULE_AUP}>
            АУП
          </LibraryButton>
        </div>
      </div>
      <div className={classesInfo.list}>
        <ScheduleList
          data={
            props[
              `schedule${
                holiday === "true" || holiday === "1" ? "Secondary" : "Default"
              }`
            ][`schedule${schedule === SCHEDULE_AUP ? "Aup" : ""}`]
          }
          isHoliday={holiday === "true" || holiday === "1"}
        />
      </div>
    </div>
  );
};

export default Schedule;
