import classNames from "classnames";

import classes from "./Poster-group.module.css";

const PosterGroup = ({ children, className }) => (
  <div className={classNames(classes.block, className)}>{children}</div>
);
export default PosterGroup;
