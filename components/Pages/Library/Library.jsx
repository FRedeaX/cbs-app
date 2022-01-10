import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { asyncLoadScript } from "../../../helpers";
import Title, { SUBTITLE } from "../../Title/Title";
import Button from "../../UI/Button/Button";
import { Heading } from "../../blocks/Heading/Heading";
import ContactInfo from "./ContactInfo/ContactInfo";
import classes from "./Library.module.css";
import LibraryInfo from "./LibraryInfo/LibraryInfo";

let map;
const YMAP_API =
  "https://api-maps.yandex.ru/2.1/?apikey=76dd679b-d43f-4800-b744-f749eb0b34aa&lang=ru_RU";

const Library = ({ filials }) => {
  const router = useRouter();
  const {
    query: { lib, schedule },
  } = router;

  const [isMap, setIsMap] = useState(false);
  const [filial, setFilial] = useState(filials[lib] || filials.cgb);

  const selectPlacemark = useCallback(() => {
    const geoObjects = window.ymaps.geoQuery(map.geoObjects);
    const selected = geoObjects
      .search(`properties.id = '${filial.slug}'`)
      .setOptions("preset", "islands#redIcon");
    geoObjects.remove(selected).setOptions("preset", "islands#blueIcon");
  }, [filial.slug]);

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
        const placemark = new window.ymaps.Placemark(
          [item.pointX, item.pointY],
          {
            id: item.slug,
            balloonContentHeader: item.name,
            balloonContentBody: item.address,
          },
          {
            preset: "twirl#greenStretchyIcon",
          },
        );
        map.geoObjects.add(placemark);
        placemark.events.add("click", (e) => {
          const id = placemark.properties.get("id");

          // const s = new URLSearchParams(window.location.query).has("schedule");

          router.replace(
            `/biblioteki?lib=${id}&schedule=${schedule || "default"}`,
          );

          const targetObject = e.get("target");
          if (targetObject.geometry.getType() === "Point") {
            // map.panTo(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
            map.setCenter(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
          }
        });
        placemark.events.add("balloonclose", () => {
          map.setZoom(zoom);
          map.setCenter([45.6246, 63.308]);
        });
      });
      setIsMap(true);
    }

    asyncLoadScript(YMAP_API, window.ymaps).then(() =>
      window.ymaps.ready(init),
    );
  }, [filials, router, schedule]);

  useEffect(() => {
    setFilial(filials[lib] || filials.cgb);
    if (isMap !== false) selectPlacemark();
  }, [filials, lib, isMap, selectPlacemark]);

  const renderControls = () =>
    Object.values(filials).map((item) => (
      <Link
        key={item.slug}
        href={`/biblioteki?lib=${item.slug}&schedule=${schedule || "default"}`}
        passHref
        replace
        scroll={false}>
        <Button
          view="link"
          className={classNames(classes.link, {
            [classes.active]: filial.slug === item.slug,
          })}>
          {item.shortName}
        </Button>
      </Link>
    ));

  return (
    <div className={classes.body}>
      <div className={classes.header}>
        <Heading level={1} className={classes.title}>
          {filial.name}
        </Heading>
      </div>
      <Title type={SUBTITLE} HtmlTeg="h3" cls={classes.subtitle}>
        {filial.address}
      </Title>
      <div className={classes.controls}>{renderControls()}</div>
      <div className={classes.content}>
        <div id="map" className={classes.map} />
        <aside className={classes.aside}>
          <ContactInfo
            schedule={filial.schedule}
            scheduleAUP={filial.scheduleAUP}
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
