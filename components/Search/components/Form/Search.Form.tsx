import ClickAwayListener from "@mui/base/ClickAwayListener";
import FocusTrap from "@mui/base/FocusTrap";
import { FC, ReactNode } from "react";

import { KeyDownAwayListener } from "../../../../base";
import { SEARCH_PATHNAME } from "../../../../constant";
import { useInputContext } from "../Input/context";
import { useInput } from "../Input/utils";
import classes from "./Search.Form.module.css";

interface ISearchFormProps {
  children: ReactNode;
}

export const SearchForm: FC<ISearchFormProps> = ({ children }) => {
  const { isFocus, handleRemoveFocus } = useInputContext();
  const { handleReturnsFocus } = useInput();

  return (
    <ClickAwayListener onClickAway={handleRemoveFocus}>
      <form className={classes.root} action={SEARCH_PATHNAME} tabIndex={-1}>
        <KeyDownAwayListener
          onKeyDownAway={handleReturnsFocus}
          keyboardCode={["Escape"]}>
          <FocusTrap open={isFocus}>
            <div className={classes.body}>{children}</div>
          </FocusTrap>
        </KeyDownAwayListener>
      </form>
    </ClickAwayListener>
  );
};
