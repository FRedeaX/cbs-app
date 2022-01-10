import classNames from "classnames";
import React from "react";

import classes from "./Poster-list.module.css";

const PosterList = ({ children, className }) => (
  <div className={classNames(classes.block, className)}>{children}</div>
);

export default PosterList;
