/* eslint-disable prefer-destructuring */
const getStringMonth = (month) => {
  switch (String(month)) {
    case "1":
      return "Января";
    case "2":
      return "Февраля";
    case "3":
      return "Марта";
    case "4":
      return "Апреля";
    case "5":
      return "Мая";
    case "6":
      return "Июня";
    case "7":
      return "Июля";
    case "8":
      return "Августа";
    case "9":
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

// const isPush = (currentPoster, { month, day, hours }, skip) => {
//   const poster = currentPoster;
//   const { posterDate } = poster;
//   const posterDay = posterDate.dateStart.day;
//   const posterMonth = posterDate.dateStart.month;
//   const posterDayEnd = posterDate.dateEnd.day;

//   // пропускаем анонс если (месяц равен текущему и
//   // ((мероприятие длится 1 день и
//   // (дата меньше текущей или (дата равна текущей и[но] текущее время больше 18ч))) или
//   // мероприятие длится дольше 1 дня, но дата окончания меньше текущей даты или
//   // (дата окончания равна текущей и[но] текущее время больше 18ч))
//   if (
//     posterMonth === month &&
//     ((!posterDayEnd &&
//       (posterDay < day || (posterDay === day && hours > 18))) ||
//       (posterDayEnd !== null && posterDayEnd < day) ||
//       (posterDayEnd === day && hours > 18))
//   )
//     console.log("+");

//   if (posterMonth === month) {
//     if (posterDay < day || (posterDay === day && hours >= 18)) {
//       poster.isSkip = true;
//     }
//   }

//   return poster;
// };

/**
 * преобразует объект posterDate
 * @param {*} posterList
 * @returns posterList
 */
export const dateConversion = async (posterList) => {
  if (!posterList) return null;
  const result = [];
  let dayStart;
  let monthStart;
  let dayEnd = null;
  let monthEnd = null;

  posterList.forEach((poster) => {
    dayStart = poster.posterDate.date.split("/")[0];
    monthStart = parseInt(poster.posterDate.date.split("/")[1], 10);

    if (poster.posterDate.dataend !== null) {
      dayEnd = poster.posterDate.dataend.split("/")[0];
      monthEnd = parseInt(poster.posterDate.dataend.split("/")[1], 10);
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

export const sort = async (posterList) => {
  if (!posterList) return null;
  return posterList.sort(
    (a, b) => a.posterDate.dateStart.day - b.posterDate.dateStart.day,
  );
};

export const filter = async (posterList) => {
  if (!posterList) return null;
  let skip = 0;
  const date = new Date();
  const currentDate = {
    month: date.getMonth() + 1,
    day: date.getDate() - 3,
    hours: date.getHours(),
  };
  // console.log("day", currentDate.day);

  posterList.forEach((poster, index) => {
    const { posterDate } = poster;
    const posterDay = posterDate.dateStart.day;
    const posterMonth = posterDate.dateStart.month;
    const posterDayEnd = posterDate.dateEnd.day;

    if (posterMonth === currentDate.month) {
      if (
        posterDay < currentDate.day ||
        (posterDay === currentDate.day && currentDate.hours >= 18)
      ) {
        skip = index + 1;
      }
    }
  });

  return { posterList, skip };
};
