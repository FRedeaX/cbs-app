import { FC, ReactNode } from "react";

import { SEARCH_PATHNAME } from "../../../../constant";
import classes from "./Search.Form.module.css";

interface ISearchFormProps {
  children: ReactNode;
}

export const SearchForm: FC<ISearchFormProps> = ({ children }) => (
  <form className={classes.root} action={SEARCH_PATHNAME} tabIndex={-1}>
    {children}
  </form>
);
