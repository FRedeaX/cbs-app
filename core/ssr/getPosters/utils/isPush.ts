import { Poster } from "../type";

type CurrentDate = {
  year: number;
  month: number;
  day: number;
  hours: number;
};

export const isPush = (
  { posterDate: { dateStart, dateEnd } }: Poster,
  { year, month, day, hours }: CurrentDate,
) => {
  const dayStart = dateStart.day;
  const monthStart = dateStart.month;
  const yearStart = dateStart.year;

  const dayEnd = dateEnd?.day ?? null;
  const monthEnd = dateEnd?.month ?? null;
  const yearEnd = dateEnd?.year ?? null;

  if (yearStart < year && (yearEnd || 0) < year) return false;
  if (yearStart === year || yearEnd === year) {
    if (dayEnd !== null && monthEnd !== null) {
      if (monthEnd < month && yearEnd === year) return false;
      if (monthEnd === month) {
        if (dayEnd < day || (dayEnd === day && hours > 18)) {
          return false;
        }
      }
    } else {
      if (monthStart < month) return false;
      if (monthStart === month) {
        if (dayStart < day || (dayStart === day && hours > 18)) {
          return false;
        }
      }
    }
  }

  return true;
};
