import { FC } from "react";

import { InputSearchButton } from "./Input.SearchButton/Input.SearchButton";
import { InputTextField } from "./Input.TextField/Input.TextField";
import classes from "./Search.Input.module.css";

export const SearchInput: FC = () => (
  <div className={classes.root}>
    <InputTextField />
    <InputSearchButton />
  </div>
);
