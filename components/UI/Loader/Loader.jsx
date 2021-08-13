import classNames from "classnames";
import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ className, isFullscreen, isBackground1 = false }) => (
  <div
    className={classNames(classes.body, {
      [classes.fixed]: isFullscreen,
      [classes.background]: isFullscreen,
      [classes["background-1"]]: isBackground1,
    })}
  >
    <div className={classNames(classes.container, className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
