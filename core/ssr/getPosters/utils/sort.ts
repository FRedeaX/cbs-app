import { Nullable } from "@/helpers/typings/utility-types";

import { Poster } from "../type";

/**
 * 1. Так как в один день могут начинаться события продолжительностью
 * один и более дней, ставим однодневные мероприятия в начало
 *
 * 2. Так как в один день могут начинаться несколько событий,
 * ставим мероприятия с указанным временем в начало сортируя по возрастанию
 * мероприятия без указанного времени получают время равное 24 часам
 */
export const sort = (posterList: Nullable<Poster[]>) => {
  if (!posterList) return null;

  return posterList.sort(
    (
      { posterDate: { dateStart: aDateStart, dateEnd: aDateEnd, time: atime } },
      { posterDate: { dateStart: bDateStart, dateEnd: bDateEnd, time: btime } },
    ) =>
      aDateStart.year - bDateStart.year ||
      aDateStart.month - bDateStart.month ||
      aDateStart.day - bDateStart.day ||
      /* 1. */
      (aDateEnd?.day ?? NaN) - (bDateEnd?.day ?? NaN) ||
      /* 2. */
      parseInt(atime ?? "24", 10) - parseInt(btime ?? "24", 10),
  );
};
