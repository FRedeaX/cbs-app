const weekday = {
  monday: "пн",
  tuesday: "вт",
  wednesday: "ср",
  thursday: "чт",
  friday: "пт",
  saturday: "сб",
  sunday: "вс",
  cleanupDay: "Санитарный день",
  lunchBreak: "Обед",
};

export const filials = {
  cgb: {
    shortName: "ЦГБ",
    name: "Центральная городская библиотека",
    title: "Центральной городской библиотеки",
    address: "5-й мкр, дом 3«А»",
    slug: "cgb",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "10:00-17:00",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
    ],
    scheduleSecondary: [],
    email: "cbsbaikonur@yandex.ru",
    telefon: [
      {
        position: "Директор",
        name: "Неспанова Ольга Васильевна",
        tel: "50287",
      },
      {
        position: "Заместитель директора",
        name: "Некрасова Марина Викторовна",
        tel: "50181",
      },
      {
        position: "Главный бухгалтер",
        name: "Шагабудинова Людмила Васильевна",
        tel: "50293",
      },
      {
        position: "Юрисконсульт",
        name: "Кулмурзаева Анжелика Андреевна",
        tel: "51361",
      },
      {
        position: "Главный инженер",
        name: "Досбаева Эльмира Багдатовна",
        tel: "50181",
      },
      {
        position: "Заведующая отделом обслуживания ЦГБ",
        position_desc:
          "Заведующая отделом обслуживания Центральной городской библиотеки",
        name: "Трошина Виктория Борисовна",
        tel: "51176",
      },
      {
        position: "Ученый секретарь ЦГБ",
        position_desc: "Ученый секретарь Центральной городской библиотеки",
        name: "Семёнова Ирина Владимировна",
        tel: "50181",
      },
      {
        position: "Заведующая отделом комплектования",
        name: "Крицкая Лариса Валентиновна",
        tel: "51361",
      },
      {
        position: "Заведующая ИБО ЦГБ",
        position_desc:
          "Заведующая информационо-библиографическим отделом Центральной городской библиотеки",
        name: "Останина Анна Васильевна",
        tel: "51361",
      },
    ],
    pointX: 45.6222,
    pointY: 63.2986,
  },
  cpopdiyu: {
    shortName: "ЦпоПДиЮ",
    name: "Центр по проблемам детей и юношества",
    title: "Центр по проблемам детей и юношества",
    address: 'ГКУ ЦПМИ "Будущее Байконура"',
    slug: "cpopdiyu",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
    ],
    scheduleSecondary: [],
    pointX: 45.62774,
    pointY: 63.32687060869672,
  },
  cgdb: {
    shortName: "ЦГДБ",
    name: "Центральная городская детская библиотека им. А.С. Пушкина",
    title: "Центральной городской детской библиотеки им. А.С. Пушкина",
    address: "ул. Максимова, дом 10, здание ЦРТДиЮ (первый этаж)",
    slug: "cgdb",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.friday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.friday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:00",
      },
    ],
    scheduleSecondary: [],
    telefon: [
      {
        position: "Заведующая ЦГДБ им. А.С. Пушкина",
        position_desc:
          "Заведующая Центральной городской детской библиотеки им.А.С. Пушкина",
        name: "Демина Светлана Викторовна",
        tel: "72981",
      },
    ],
    pointX: 45.62464,
    pointY: 63.328,
  },
  f1: {
    shortName: "Филиал №1",
    name: "Библиотека им. Т.Г. Шевченко (филиал №1)",
    title: "Библиотеки им. Т.Г. Шевченко",
    address: "ул. Янгеля, дом 23«А»",
    slug: "f1",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последний четверг месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
    ],
    scheduleSecondary: [],
    telefon: [
      {
        position: "Заведующая библиотекой – филиал №1",
        name: "Кузнецова Ольга Игоревна",
        tel: "71925",
      },
    ],
    pointX: 45.6362,
    pointY: 63.3138,
  },
  f5: {
    shortName: "Филиал №5",
    name: "Библиотека семейного чтения (филиал №5)",
    title: "Библиотеки семейного чтения",
    address: "7-й мкр, дом 7, кв. 39-40",
    slug: "f5",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последний четверг месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
    ],
    scheduleSecondary: [],
    telefon: [
      {
        position: "Заведующая библиотекой – филиал №5",
        name: "Залгараева Баян Мадинаевна",
        tel: "54993",
      },
    ],
    pointX: 45.6145,
    pointY: 63.2928,
  },
  ooef: {
    shortName: "ОЕФКиТЛ",
    name: "Отдел организации Единого фонда, книгохранения и технической литературы",
    title:
      "Отдела организации Единого фонда, книгохранения и технической литературы",
    address: "ул. Титова, дом 6",
    slug: "ooef",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    scheduleAUP: [
      {
        weekday: weekday.monday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        lunchBreak: true,
        weekday: weekday.lunchBreak,
        time: "13:00-14:30",
      },
    ],
    scheduleSecondary: [],
    telefon: [
      {
        position: "Заведующая отделом ОЕФКиТЛ",
        position_desc:
          "Заведующая отделом Единого фонда, книгохранения и технической литературы",
        name: "Савина Лариса Геннадьевна",
        tel: "75309",
      },
    ],
    pointX: 45.61659,
    pointY: 63.31899,
  },
};
