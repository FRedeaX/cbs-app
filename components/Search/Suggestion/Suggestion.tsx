import classNames from "classnames";
import { FC, ReactNode } from "react";
import classes from "./Suggestion.module.css";

const Suggestion: FC<{ isSuggest: boolean; children?: ReactNode }> = ({
  isSuggest,
  children,
}) => (
  <div
    className={classNames(classes.block, {
      [classes.block_isVisible]: isSuggest,
    })}>
    <div>{children}</div>
  </div>
);

export default Suggestion;
