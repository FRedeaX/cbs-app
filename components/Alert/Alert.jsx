import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import React, { memo, useEffect, useState } from "react";
import classes from "./Alert.module.css";

const Alert = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const storage = window.localStorage.getItem("isAlertHidden");
    setVisible(!storage);
  }, []);

  const onCloseHendler = () => {
    window.localStorage.setItem("isAlertHidden", true);
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

export default memo(Alert);
