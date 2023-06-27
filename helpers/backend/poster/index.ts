import { PosterGQL } from "@/components/poster/gql/posterGQL";

import { Nullable, NullableAll } from "../../typings/utility-types";

type Venue = {
  name: string;
  description: Nullable<string>;
  slug: string;
};

type DateStart = {
  day: string;
  month: number;
  monthText: string;
};

interface IPoster {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  posterDepartments: {
    nodes: Venue[];
  };
  posterLocations: {
    nodes: Venue[];
  };
  posterDate: {
    dateStart: DateStart & {
      year: number;
    };
    dateEnd: NullableAll<DateStart>;
    time: string | null;
  };
}

type Date = {
  year: number;
  month: number;
  day: number;
  hours: number;
};

const getStringMonth = (month: number) => {
  switch (month) {
    case 1:
      return "Января";
    case 2:
      return "Февраля";
    case 3:
      return "Марта";
    case 4:
      return "Апреля";
    case 5:
      return "Мая";
    case 6:
      return "Июня";
    case 7:
      return "Июля";
    case 8:
      return "Августа";
    case 9:
      return "Сентября";
    case 10:
      return "Октября";
    case 11:
      return "Ноября";
    case 12:
      return "Декабря";
    default: {
      throw new Error(
        `month=${month}. Переменная "month" меньше 1 или больше 12.`,
      );
    }
  }
};

const isPush = (
  { posterDate: { dateStart, dateEnd } }: IPoster,
  { year, month, day, hours }: Date,
) => {
  const posterDay = parseInt(dateStart.day, 10);
  const posterMonth = dateStart.month;

  const posterDayEnd = parseInt(dateEnd.day ?? "", 10);
  const posterMonthEnd = dateEnd.month;

  if (dateStart.year === year)
    if (posterMonthEnd !== null) {
      if (posterMonthEnd < month) return false;
      if (posterMonthEnd === month) {
        if (posterDayEnd < day || (posterDayEnd === day && hours > 18)) {
          return false;
        }
      }
    } else {
      if (posterMonth < month) return false;
      if (posterMonth === month) {
        if (posterDay < day || (posterDay === day && hours > 18)) {
          return false;
        }
      }
    }

  return true;
};

/**
 * преобразует объект posterDate
 * @param {*} posterList
 * @returns posterList
 */
export const dateConversion = async (
  posterList: PosterGQL["posters"]["nodes"],
): Promise<IPoster[] | null> => {
  if (!posterList) return null;
  const result: IPoster[] = [];
  let dayStart;
  let monthStart;
  let yearStart;
  let dayEnd;
  let monthEnd;

  posterList.forEach((poster) => {
    const dateStartSplit = poster.posterDate.date.split("/");
    [dayStart] = dateStartSplit;
    monthStart = parseInt(dateStartSplit[1], 10);
    yearStart = parseInt(dateStartSplit[2], 10);

    dayEnd = null;
    monthEnd = null;
    if (poster.posterDate.dataend !== null) {
      const dateEndSplit = poster.posterDate.dataend.split("/");
      [dayEnd] = dateEndSplit;
      monthEnd = parseInt(dateEndSplit[1], 10);
    }

    result.push({
      ...poster,
      posterDate: {
        dateStart: {
          day: dayStart,
          month: monthStart,
          monthText: getStringMonth(monthStart),
          year: yearStart,
        },
        dateEnd: {
          day: dayEnd,
          month: monthEnd,
          monthText: monthEnd ? getStringMonth(monthEnd) : null,
        },
        time: poster.posterDate.time,
      },
    });
  });

  return result;
};

/**
 * 1. Так как в один день могут начинаться события продолжительностью
 * один и более дней, ставим однодневные мероприятия в начало
 *
 * 2. Так как в один день могут начинаться несколько событий,
 * ставим мероприятия с указанным временем в начало сортируя по возрастанию
 * мероприятия без указанного времени получают время равное 24 часам
 */
export const sort = async (posterList: Nullable<IPoster[]>) => {
  if (!posterList) return null;

  return posterList.sort(
    (
      { posterDate: { dateStart: aDateStart, dateEnd: aDateEnd, time: atime } },
      { posterDate: { dateStart: bDateStart, dateEnd: bDateEnd, time: btime } },
    ) =>
      aDateStart.month - bDateStart.month ||
      parseInt(aDateStart.day, 10) - parseInt(bDateStart.day, 10) ||
      /* 1. */
      parseInt(aDateEnd.day ?? "0", 10) - parseInt(bDateEnd.day ?? "0", 10) ||
      /* 2. */
      parseInt(atime ?? "24", 10) - parseInt(btime ?? "24", 10),
  );
};

export const filter = async (posterList: Nullable<IPoster[]>) => {
  if (!posterList) return null;

  const date = new Date();
  const currentDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
  };

  return posterList.filter((poster) => isPush(poster, currentDate));
};

// пропускаем анонс если (месяц равен текущему и
// ((мероприятие длится 1 день и
// (дата меньше текущей или (дата равна текущей и[но] текущее время больше 18ч))) или
// мероприятие длится дольше 1 дня, но дата окончания меньше текущей даты или
// (дата окончания равна текущей и[но] текущее время больше 18ч))
// if (
//   posterMonth === month &&
//   ((!posterDayEnd &&
//     (posterDay < day || (posterDay === day && hours > 18))) ||
//     (posterDayEnd !== null && posterDayEnd < day) ||
//     (posterDayEnd === day && hours > 18))
// );
