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
    const { date, dateEnd } = poster.posterDate;

    return {
      ...poster,
      posterDate: {
        dateStart: parseDate(date),
        dateEnd: dateEnd ? parseDate(dateEnd) : null,
        time: poster.posterDate.time,
      },
    };
  });
