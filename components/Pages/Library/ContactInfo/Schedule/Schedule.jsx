import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Button from "~/components/UI/Button/Button";
import { Heading } from "../../../../blocks/Heading/Heading";
import classesInfo from "../Contact-info.module.css";
import classes from "./Schedule.module.css";

export const Schedule = ({ schedule, scheduleSecondary }) => {
  const { search } = useRouter();

  const isSchedule = useMemo(() => {
    return new URLSearchParams(search).has("schedule");
  }, [search]);

  const lib = useMemo(() => {
    const s = new URLSearchParams(search);
    return s.has("lib") ? `lib=${s.get("lib")}` : null;
  }, [search]);

  function renderScheduleItem(data) {
    return data.map((item) => {
      return (
        <div
          key={item.weekday}
          className={classNames([
            classesInfo.item,
            classes.item,
            { [classes["item--cleanup-day"]]: item.cleanupDay },
          ])}
        >
          <span
            className={classNames(classesInfo["left-column"], {
              [classes.day]: isSchedule,
              [classes.weekday]: !isSchedule,
            })}
          >
            {item.weekday}
          </span>
          <span className={classes.time}>{item.time}</span>
        </div>
      );
    });
  }
  return (
    <div className={classesInfo.info}>
      <div className={classes.header}>
        <Heading
          level={4}
          className={classNames(classesInfo.title, classes.title)}
        >
          График работы
        </Heading>
        {!!scheduleSecondary.length && (
          <div className={classes.controls}>
            <Button
              to={{
                pathname: "/biblioteki/",
                search:
                  isSchedule && new URLSearchParams(search).has("lib")
                    ? `?lib=${new URLSearchParams(search).get("lib")}`
                    : search,
                state: {
                  scrollToTop: false,
                },
              }}
              isActive={() => !isSchedule}
              activeClassName={classes.active}
              className={classes.link}
              aria-current={"step"}
            >
              Ежедневный
            </Button>
            <Button
              to={{
                pathname: "/biblioteki/",
                search: isSchedule
                  ? search
                  : !isSchedule && lib
                  ? `?${lib}&schedule=1`
                  : "?schedule=1",
                state: {
                  scrollToTop: false,
                },
              }}
              isActive={() => !!isSchedule}
              activeClassName={classes.active}
              className={classes.link}
              aria-current={"step"}
            >
              Праздничные дни
            </Button>
          </div>
        )}
      </div>
      <div className={classesInfo.list}>
        {renderScheduleItem(isSchedule ? scheduleSecondary : schedule)}
      </div>
    </div>
  );
};
