const getStringMonth = (month) => {
  switch (String(month)) {
    case "01":
      return "Января";
    case "02":
      return "Феваля";
    case "03":
      return "Марта";
    case "04":
      return "Апреля";
    case "05":
      return "Мая";
    case "06":
      return "Июня";
    case "07":
      return "Июля";
    case "08":
      return "Августа";
    case "09":
      return "Сентября";
    case "10":
      return "Октября";
    case "11":
      return "Ноября";
    case "12":
      return "Декабря";
    default:
      return null;
  }
};

/**
 * преобразует объект posterDate
 * @param {*} posterList
 * @returns posterList
 */
export const dateConversion = async (posterList) => {
  if (!posterList) return null;
  const result = [];
  let dayStart,
    monthStart,
    dayEnd = null,
    monthEnd = null;

  posterList.forEach((poster) => {
    dayStart = parseInt(poster.posterDate.date.split("/")[0], 10);
    monthStart = parseInt(poster.posterDate.date.split("/")[1], 10);

    if (poster.posterDate.dataend !== null) {
      dayEnd = parseInt(poster.posterDate.dataend?.split("/")[0], 10);
      monthEnd = parseInt(poster.posterDate.dataend?.split("/")[1], 10);
    }

    result.push({
      ...poster,
      posterDate: {
        dateStart: {
          day: dayStart,
          month: monthStart,
          monthText: getStringMonth(monthStart),
        },
        dateEnd: {
          day: dayEnd,
          month: monthEnd,
          monthText: getStringMonth(monthEnd),
        },
      },
    });
  });

  return result;
};

export const sort = async (posterList) =>
  posterList.sort(
    (a, b) => a.posterDate.dateStart.day - b.posterDate.dateStart.day
  );

export const filter = async (posterList) => {
  if (!posterList && posterList.length < 2) return null;
  const _date = new Date();
  const date = {
    month: _date.getMonth() + 1,
    day: _date.getDate(),
    hours: _date.getHours(),
  };

  const result = [];
  posterList.forEach((poster) => {
    const element = isPush(poster, date);
    if (element !== null) result.push(element);
  });
  return result;
};
const isPush = (poster, { month, day, hours }) => {
  const posterDate = poster.posterDate;
  const posterDay = posterDate.dateStart.day;
  const posterMonth = posterDate.dateStart.month;
  const posterDayEnd = posterDate.dateEnd.day;

  // пропускаем анонс если (месяц равен текущему и
  // ((мероприятие длится 1 день и
  // (дата меньше текущей или (дата равна текущей и[но] текущее время больше 18ч))) или
  // мероприятие длится дольше 1 дня, но дата окончания меньше текущей даты или
  // (дата окончания равна текущей и[но] текущее время больше 18ч))
  if (
    posterMonth === month &&
    ((!posterDayEnd &&
      (posterDay < day || (posterDay === day && hours > 18))) ||
      (posterDayEnd !== null && posterDayEnd < day) ||
      (posterDayEnd === day && hours > 18))
  )
    return null;

  return poster;
};
