import classNames from "classnames";
import React, { useState } from "react";
import { Heading } from "../../../../blocks/Heading/Heading";
import classesInfo from "../Contact-info.module.css";
import classes from "./Telefon.module.css";

export const Telefon = ({ telefon, cls }) => {
  const [countTel, setCountTel] = useState(3);

  function renderTelefonItem(data) {
    return data
      .filter((_, index) => index < countTel)
      .map((item, index) => {
        return (
          <div
            key={index}
            className={classNames(classesInfo.item, classes.item)}
          >
            <div className={classesInfo["left-column"]}>
              <span className={classes.subtitle}>{item.position}</span>
              <span className={classes.description}>{item.name}</span>
            </div>
            <a className={cls} href={`tel:833622${item.tel}`}>
              {item.tel}
            </a>
          </div>
        );
      });
  }

  function hendleClick(e) {
    if (countTel === telefon.length) {
      setCountTel(3);
      e.target.textContent = "Показать ещё";
    } else {
      setCountTel(telefon.length);
      e.target.textContent = "Скрыть";
    }
  }
  return (
    <div className={classNames(classesInfo.info, classesInfo["info--mt"])}>
      {/* {console.log("Telefon")} */}
      <Heading
        level={4}
        className={classNames(classesInfo.title, classes.title)}
      >
        Телефон
      </Heading>
      <div className={classNames(classesInfo.list, classes.list)}>
        {renderTelefonItem(telefon)}
        {telefon.length > 1 && (
          <button className={classes.button} onClick={(e) => hendleClick(e)}>
            Показать ещё
          </button>
        )}
      </div>
    </div>
  );
};
