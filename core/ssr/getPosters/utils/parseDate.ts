import { EventDate } from "../type";

import { stringMonth } from "./stringMonth";

export const parseDate = (date: string): EventDate => {
  const dateSplit = date.split("/");
  const day = parseInt(dateSplit[0], 10);
  const month = parseInt(dateSplit[1], 10) - 1;
  const year = parseInt(dateSplit[2], 10);

  return { day, month, year, monthText: stringMonth[month] };
};
