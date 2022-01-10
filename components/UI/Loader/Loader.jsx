import classNames from "classnames";
import React from "react";

import classes from "./Loader.module.css";

const Loader = ({ className, isFullscreen }) => (
  <div
    className={classNames(classes.body, {
      [classes.fixed]: isFullscreen,
    })}>
    <div className={classNames(classes.container, className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
