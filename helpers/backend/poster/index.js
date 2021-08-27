export const postersFilter = async (posters) => {
  if (!posters) return null;
  const _date = new Date();
  const date = {
    month: _date.getMonth() + 1,
    day: _date.getDate(),
    hours: _date.getHours(),
  };

  const lastPoster = posters[posters.length - 1]?.posterDate.date;
  if (!lastPoster) return null;
  const lastPosterDay = parseInt(lastPoster.split("/")[0], 10); // * 1;
  const lastPosterMonth = parseInt(lastPoster.split("/")[1], 10); // * 1;
  if (
    (lastPosterDay < date.day ||
      (lastPosterDay === date.day && date.hours > 18)) &&
    lastPosterMonth === date.month
  )
    return null;

  const _posters = [];
  // let posterByTwo = [];
  for (let index = 0; index < posters.length; index++) {
    const element = isPush(posters[index], date);
    if (element !== null) _posters.push(element); //posterByTwo

    // if (posterByTwo.length === 2 || posters[index + 1] === undefined) {
    //   _posters.push(posterByTwo);
    //   posterByTwo = [];
    // }
  }
  return _posters;
};

const isPush = (element, { month, day, hours }) => {
  const posterDate = element.posterDate;
  const posterDay = posterDate.date.split("/")[0] * 1;
  const posterDayEnd = posterDate.dataend?.split("/")[0] * 1;
  const posterMonth = posterDate.date.split("/")[1] * 1;

  // пропускаем анонс если (месяц равен текущему и
  // ((мероприятие длится 1 день и
  // (дата меньше текущей или (дата равна текущей и[но] текущее время больше 18ч))) или
  // мероприятие длится дольше 1 дня, но дата окончания меньше текущей даты или
  // (дата окончания равна текущей и[но] текущее время больше 18ч))
  if (
    posterMonth === month &&
    ((!posterDayEnd &&
      (posterDay < day || (posterDay === day && hours > 18))) ||
      posterDayEnd < day ||
      (posterDayEnd === day && hours > 18))
  )
    return null;

  return element;
};
