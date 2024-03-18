import { Nullable } from "@/helpers/typings/utility-types";

import {
  BibliotekaFieldsGQL,
  BibliotekiSchedule,
  BibliotekiScheduleAup,
} from "../gql/getBibliotekiGQL";

import { parseStringToObject } from "./parseStringToObject";
import { transformSchedule } from "./transformSchedule";

type ScheduleNode = {
  day: string;
  time: string;
  lunchBreak?: boolean;
  cleanupDay?: boolean;
};

type Schedule<T = never> = {
  schedule: ScheduleNode[] | T;
  scheduleAup: ScheduleNode[] | T;
};

type TransformFieldsResult = {
  order: number;
  name: string;
  address: string;
  shortName: string;
  id: string;
  email: Nullable<string>;
  point: [number, number];
  telefon: Nullable<string>;
  scheduleDefault: Schedule;
  scheduleSecondary: Schedule<null>;
};

export const transformFields = ({
  menuOrder,
  bibliotekiBase,
  bibliotekiSchedule,
  bibliotekiScheduleAup,
}: BibliotekaFieldsGQL): TransformFieldsResult => {
  const point = bibliotekiBase.point.split(",");

  return {
    order: menuOrder,
    name: bibliotekiBase.name,
    address: bibliotekiBase.address,
    shortName: bibliotekiBase.shortName,
    id: bibliotekiBase.id,
    email: bibliotekiBase.email,
    point: [parseFloat(point[0]), parseFloat(point[1])],
    telefon:
      bibliotekiBase.telefon && parseStringToObject(bibliotekiBase.telefon),
    scheduleDefault: {
      schedule: transformSchedule<BibliotekiSchedule>(bibliotekiSchedule),
      scheduleAup: transformSchedule<BibliotekiScheduleAup>(
        bibliotekiScheduleAup,
        "Aup",
      ),
    },
    scheduleSecondary: {
      schedule: bibliotekiSchedule.isHoliday
        ? parseStringToObject(bibliotekiSchedule.holiday)
        : null,
      scheduleAup: bibliotekiScheduleAup.isHolidayAup
        ? parseStringToObject(bibliotekiScheduleAup.holidayAup)
        : null,
    },
  };
};
