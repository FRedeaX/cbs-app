"use client";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";

import classes from "./Alert.module.css";

type AlertProps = {
  /**
   * Включить уведомление для определенных маршрутов.
   *
   * @example ["/", "/poster"]
   */
  includeRoute?: string[];
};

// TODO: Заменить localStorage функцию
export const Alert: FC<PropsWithChildren<AlertProps>> = ({
  children,
  includeRoute,
}) => {
  const route = usePathname() ?? "";
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const isInclude = includeRoute?.includes(route);
    const isRoute = isInclude === undefined ? true : isInclude;
    const storage = window.localStorage.getItem("isAlertHidden");

    setVisible(!storage && isRoute);
  }, [includeRoute, route]);

  const onCloseHendler = () => {
    window.localStorage.setItem("isAlertHidden", "true");
    setVisible(false);
  };
  return (
    <div
      className={classNames(
        classes.wrapper,
        classes[`wrapper_isVisible_${isVisible}`],
      )}>
      {children}
      <div className={classes.close}>
        <IconButton
          sx={{
            color: "#fff",
            height: "30px",
            width: "30px",
          }}
          onClick={onCloseHendler}
          aria-label="Закрыть сообщение">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};
