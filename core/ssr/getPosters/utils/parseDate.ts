import { EventDate } from "../type";

import { stringMonth } from "./stringMonth";

export const parseDate = (date: string): EventDate => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  return { day, month, year, monthText: stringMonth[month] };
};
