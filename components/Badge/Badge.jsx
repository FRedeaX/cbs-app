import classNames from "classnames";
import classes from "./Badge.module.css";
export const Badge = ({ count, length, className }) => (
  <div
    className={classNames(className, classes.wraper)}
  >{`${count}/${length}`}</div>
);

// {react.createElement(Badge, { className: [length], count: 4 }, null)}
// Badge={({ className, count }) => ()}
