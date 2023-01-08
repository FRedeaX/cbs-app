import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./Search.Suggestion.module.css";

export const SearchSuggestion: FC<{
  isSuggest: boolean;
  children: ReactNode;
}> = ({ isSuggest, children }) => (
  <div
    className={classNames(classes.root, {
      [classes.root_isVisible]: isSuggest,
    })}>
    {children}
  </div>
);
