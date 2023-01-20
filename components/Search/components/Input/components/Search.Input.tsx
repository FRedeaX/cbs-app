import { FC } from "react";

import classes from "./Search.Input.module.css";
import { InputSearchButton } from "./Input.SearchButton/Input.SearchButton";
import {
  InputTextField,
  InputTextFieldProps,
} from "./Input.TextField/Input.TextField";

export const SearchInput: FC<InputTextFieldProps> = ({ autoFocus }) => (
  <div className={classes.root}>
    <InputTextField autoFocus={autoFocus} />
    <InputSearchButton />
  </div>
);
