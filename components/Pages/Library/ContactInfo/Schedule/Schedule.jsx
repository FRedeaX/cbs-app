import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Button from "~/components/UI/Button/Button";
import { Heading } from "../../../../blocks/Heading/Heading";
import classesInfo from "../Contact-info.module.css";
import classes from "./Schedule.module.css";
import Link from "next/link";

export const Schedule = ({
  scheduleDefault,
  scheduleAUP,
  scheduleSecondary,
}) => {
  const { search } = useRouter();
  const {
    pathname,
    query: { lib, schedule },
  } = useRouter();

  const isSchedule = useMemo(() => {
    return new URLSearchParams(search).has("schedule");
  }, [search]);

  // const lib = useMemo(() => {
  //   const s = new URLSearchParams(search);
  //   return s.has("lib") ? `lib=${s.get("lib")}` : null;
  // }, [search]);

  function renderScheduleItem(data) {
    if (data === undefined) return;
    return data.map((item) => {
      return (
        <div
          key={item.weekday}
          className={classNames([
            classesInfo.item,
            classes.item,
            {
              [classes["item--cleanup-day"]]: item.cleanupDay,
              [classes["item--lunchBreak"]]: item.lunchBreak,
            },
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
        <div className={classes.controls}>
          <Link
            href={`/biblioteki/?lib=${lib || "cgb"}&schedule=default`}
            passHref
            replace
            scroll={false}
          >
            <Button
              view="link"
              className={classNames(classes.link, {
                [classes.active]:
                  schedule === "default" || schedule === undefined,
              })}
            >
              Для читателей
            </Button>
          </Link>
          <Link
            href={`/biblioteki/?lib=${lib || "cgb"}&schedule=aup`}
            passHref
            replace
            scroll={false}
          >
            <Button
              view="link"
              className={classNames(classes.link, {
                [classes.active]: schedule === "aup",
              })}
            >
              АУП
            </Button>
          </Link>
        </div>
      </div>
      <div className={classesInfo.list}>
        {renderScheduleItem(schedule === "aup" ? scheduleAUP : scheduleDefault)}
      </div>
    </div>
  );
};
