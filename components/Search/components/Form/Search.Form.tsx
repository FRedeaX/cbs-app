import { FC, ReactNode } from "react";

import { SEARCH_PATHNAME } from "../../../../constant";
import { InputProvider } from "../Input/Context/Input.Provider";
import { SuggestionProvider } from "../Suggestion/Context/Suggestion.Provider";
import classes from "./Search.Form.module.css";

interface ISearchFormProps {
  children: ReactNode;
}

export const SearchForm: FC<ISearchFormProps> = ({ children }) => (
  <form className={classes.root} action={SEARCH_PATHNAME} tabIndex={-1}>
    <InputProvider>
      <SuggestionProvider>{children}</SuggestionProvider>
    </InputProvider>
  </form>
);
