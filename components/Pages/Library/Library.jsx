import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "~/components/UI/Button/Button";
import { asyncLoadScript } from "../../../helpers";
import { Heading } from "../../blocks/Heading/Heading";
import Title, { SUBTITLE } from "../../Title/Title";
import ContactInfo from "./ContactInfo/ContactInfo";
import classes from "./Library.module.css";
import LibraryInfo from "./LibraryInfo/LibraryInfo";
let map;

const Library = () => {
  const router = useRouter();
  const {
    query: { lib, schedule: isSchedule },
  } = router;

  // const findFiliasl = useCallback(
  //   (queryLib) => {
  //     const index = filials.findIndex((element) => element.slug === queryLib);
  //     console.log(index);
  //     if (index === -1) return filials[0];
  //     else return filials[index];
  //   },
  //   [lib]
  // );

  const [filial, setFilial] = useState(filials[lib] || filials.cgb);

  const selectPlacemark = useCallback(() => {
    let geoObjects = window.ymaps.geoQuery(map.geoObjects);
    // выделим выбранный
    let selected = geoObjects
      .search(`properties.id = '${filial.slug}'`)
      .setOptions("preset", "islands#redIcon");
    // все остальные перекрасим обратно
    geoObjects.remove(selected).setOptions("preset", "islands#blueIcon");
  }, [filial]);

  useEffect(() => {
    function init() {
      let zoom = 14;
      let center = [45.6246, 63.308];
      const FOCUS_ZOOM = 17;
      if (window.matchMedia("(max-width: 446px)").matches) {
        zoom = 13;
        center = [45.626, 63.308];
      }
      map = new window.ymaps.Map("map", {
        center,
        zoom,
        controls: ["zoomControl"],
      });

      Object.values(filials).forEach((item) => {
        let placemark = new window.ymaps.Placemark(
          [item.pointX, item.pointY],
          {
            id: item.slug,
            balloonContentHeader: item.name,
            balloonContentBody: item.address,
          },
          {
            preset: "twirl#greenStretchyIcon",
          }
        );
        map.geoObjects.add(placemark);
        placemark.events.add("click", function (e) {
          const id = placemark.properties.get("id");

          // const s = new URLSearchParams(window.location.query).has("schedule");

          router.replace(
            isSchedule
              ? `/biblioteki?lib=${id}&schedule=1`
              : `/biblioteki?lib=${id}`
          );

          let targetObject = e.get("target");
          if (targetObject.geometry.getType() === "Point") {
            // map.panTo(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
            map.setCenter(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
          }
        });
        placemark.events.add("balloonclose", function (e) {
          map.setZoom(zoom);
          map.setCenter([45.6246, 63.308]);
        });
      });
      selectPlacemark();
    }

    asyncLoadScript(YMAP_API, window.ymaps).then(() =>
      window.ymaps.ready(init)
    );
  }, []);

  useEffect(() => {
    setFilial(filials[lib] || filials.cgb);
  }, [router.query, filial]);

  useEffect(() => {
    if (map) selectPlacemark();
  }, [filial]);

  const renderControls = () => {
    return Object.values(filials).map((item) => {
      return (
        <Link
          key={item.slug}
          href={
            isSchedule
              ? `/biblioteki?lib=${item.slug}&schedule=1`
              : `/biblioteki?lib=${item.slug}`
          }
          passHref
          replace
          scroll={false}
        >
          <Button
            view="link"
            className={classNames(classes.link, {
              [classes.active]: filial.slug === item.slug,
            })}
          >
            {item.shortName}
          </Button>
        </Link>
      );
    });
  };

  return (
    <div className={classes.body}>
      <div className={classes.header}>
        <Heading level={1} className={classes.title}>
          {filial.name}
        </Heading>
      </div>
      <Title type={SUBTITLE} HtmlTeg={"h3"} cls={classes.subtitle}>
        {filial.address}
      </Title>
      <div className={classes.controls}>{renderControls()}</div>
      <div className={classes.content}>
        <div id="map" className={classes.map}></div>
        <aside className={classes.aside}>
          <ContactInfo
            schedule={filial.schedule}
            scheduleSecondary={filial.scheduleSecondary}
            email={filial.email}
            telefon={filial.telefon}
          />
        </aside>
        <div className={classes.info}>
          {filial.url && <LibraryInfo url={filial.url} />}
        </div>
      </div>
    </div>
  );
};

export default Library;

const weekday = {
  monday: "пн",
  tuesday: "вт",
  wednesday: "ср",
  thursday: "чт",
  friday: "пт",
  saturday: "сб",
  sunday: "вс",
  cleanupDay: "Санитарный день",
};

const filials = {
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
    scheduleSecondary: [
      //   {
      //     weekday: "",
      //     time: "",
      //   },
    ],
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
    pointX: 45.6244,
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
    pointX: 45.6166,
    pointY: 63.3189,
  },
};

const YMAP_API =
  "https://api-maps.yandex.ru/2.1/?apikey=76dd679b-d43f-4800-b744-f749eb0b34aa&lang=ru_RU";
