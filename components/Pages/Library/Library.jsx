"use client";

import { Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";

import { asyncLoadScript } from "../../../helpers";
import Title, { SUBTITLE } from "../../Title/Title";

import ButtonList from "./ButtonList/ButtonList";
import ContactInfo from "./ContactInfo/ContactInfo";
import classes from "./Library.module.css";
import LibraryInfo from "./LibraryInfo/LibraryInfo";

export const Library = ({ filialList }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lib = searchParams.get("lib");
  const schedule = searchParams.get("schedule");
  const holiday = searchParams.get("holiday");

  const mapRef = useRef(null);
  const [isMap, setIsMap] = useState(false);
  const [filial, setFilial] = useState(
    filialList[filialList.findIndex((f) => f.id === lib)] || filialList,
  );

  const selectPlacemark = useCallback(() => {
    if (isMap === false) return;

    const geoObjects = window.ymaps.geoQuery(mapRef.current?.geoObjects);
    const selected = geoObjects
      .search(`properties.id = '${filial.id}'`)
      .setOptions("preset", "islands#redIcon");
    geoObjects.remove(selected).setOptions("preset", "islands#blueIcon");
  }, [filial.id, isMap]);

  useEffect(() => {
    function init() {
      if (mapRef.current !== null) return;

      let zoom = 14;
      let center = [45.6246, 63.308];
      const FOCUS_ZOOM = 17;
      if (window.matchMedia("(max-width: 446px)").matches) {
        zoom = 13;
        center = [45.626, 63.308];
      }
      mapRef.current = new window.ymaps.Map("map", {
        center,
        zoom,
        controls: ["zoomControl"],
      });

      Object.values(filialList).forEach((item) => {
        const placemark = new window.ymaps.Placemark(
          item.point,
          {
            id: item.id,
            balloonContentHeader: item.name,
            balloonContentBody: item.address,
          },
          {
            preset: "twirl#greenStretchyIcon",
          },
        );
        mapRef.current.geoObjects.add(placemark);
        placemark.events.add("click", (e) => {
          const id = placemark.properties.get("id");

          // const s = new URLSearchParams(window.location.query).has("schedule");

          // TODO: При выборе филиала на карте график сбрасывается на дефолтный
          router.replace(
            `/biblioteki?lib=${id}&schedule=${schedule || "default"}&holiday=${
              holiday || "false"
            }`,
          );

          const targetObject = e.get("target");
          if (targetObject.geometry.getType() === "Point") {
            // mapRef.current.panTo(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
            mapRef.current.setCenter(
              targetObject.geometry.getCoordinates(),
              FOCUS_ZOOM,
            );
          }
        });
        placemark.events.add("balloonclose", () => {
          mapRef.current.setZoom(zoom);
          mapRef.current.setCenter([45.6246, 63.308]);
        });
      });
      setIsMap(true);
    }

    asyncLoadScript(process.env.NEXT_PUBLIC_YMAP_API, window.ymaps).then(() =>
      window.ymaps.ready(init),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilial(
      filialList[filialList.findIndex((f) => f.id === lib)] || filialList[0],
    );
    if (isMap !== false) selectPlacemark();
  }, [filialList, lib, isMap, selectPlacemark]);

  return (
    <div className={classes.body}>
      <div className={classes.header}>
        <Typography align="center" variant="h1" className={classes.title}>
          {filial.name}
        </Typography>
      </div>
      <Title type={SUBTITLE} HtmlTeg="h2" cls={classes.subtitle}>
        {filial.address}
      </Title>
      {filialList.length > 1 && (
        <div className={classes.controls}>
          <ButtonList
            data={filialList}
            schedule={schedule}
            holiday={holiday}
            currentFilial={filial.id}
          />
        </div>
      )}
      <div className={classes.content}>
        <div id="map" className={classes.map} />
        <aside className={classes.aside}>
          <ContactInfo
            scheduleDefault={filial.scheduleDefault}
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
