import { GetPosterQuery } from "../gql/posterGQL";
import { Poster } from "../type";

import { parseDate } from "./parseDate";

/**
 * Преобразует объект posterDate.
 */
export const dateConversion = (
  posterList: GetPosterQuery["posters"]["nodes"],
): Poster[] =>
  posterList.map((poster) => {
    const { date, dataend } = poster.posterDate;

    return {
      ...poster,
      posterDate: {
        dateStart: parseDate(date),
        dateEnd: dataend ? parseDate(dataend) : null,
        time: poster.posterDate.time,
      },
    };
  });
