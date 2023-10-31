type TransformScheduleResult = {
  day: string;
  time: string;
  lunchBreak?: boolean;
  cleanupDay?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformSchedule = <T extends Record<string, any>>(
  schedule: T,
  prefix = "",
): TransformScheduleResult[] => {
  const res: TransformScheduleResult[] = [
    {
      day: "пн",
      time: schedule[`monday${prefix}`],
    },
    {
      day: "вт",
      time: schedule[`tuesday${prefix}`],
    },
    {
      day: "ср",
      time: schedule[`wednesday${prefix}`],
    },
    {
      day: "чт",
      time: schedule[`thursday${prefix}`],
    },
    {
      day: "пт",
      time: schedule[`friday${prefix}`],
    },
    {
      day: "сб",
      time: schedule[`saturday${prefix}`],
    },
    {
      day: "вс",
      time: schedule[`sunday${prefix}`],
    },
  ];
  const lunchBreak = schedule[`lunchbreak${prefix}`][0] !== "false";
  const cleanupDay = schedule[`cleanupday${prefix}`][0] !== "false";

  if (lunchBreak) {
    res.push({
      lunchBreak,
      day: "Обед",
      time: schedule[`lunchbreak${prefix}`][1],
    });
  }

  if (cleanupDay) {
    res.push({
      cleanupDay,
      day: "Санитарный день",
      time: schedule[`cleanupday${prefix}`][1],
    });
  }

  return res;
};
