import { NullableAll } from "@/helpers/typings/utility-types";

export type DateStart = {
  day: string;
  month: number;
  monthText: string;
};

export type DateEnd = NullableAll<DateStart>;
