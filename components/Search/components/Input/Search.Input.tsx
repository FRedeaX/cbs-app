import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseComponentProps,
  InputBaseProps,
} from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useRef } from "react";

import { useForkRef } from "../../../../helpers/frontend/hooks";
import { HendleSetValue } from "../../Search.utils/hooks";
import classes from "./Search.Input.module.css";

interface ISearchInputProps extends InputBaseProps {
  hendleSetValue: HendleSetValue;
}

export const SearchInput: FC<ISearchInputProps> = ({
  value,
  inputRef: inputForkRef,
  hendleSetValue,
  ...all
}) => {
  const inputRef = useRef<InputBaseComponentProps>();
  const handleRef = useForkRef(inputRef, inputForkRef);
  const { push: routerPush } = useRouter();

  const hendleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    hendleSetValue(target.value);
  };

  const hendleReset = () => {
    routerPush("/search");
    hendleSetValue("");
    if (inputRef.current === undefined) return;
    inputRef.current.focus();
  };

  const isClearButton = !!value;

  return (
    <InputBase
      name="text"
      autoComplete="off"
      placeholder="Поиск..."
      fullWidth
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...all}
      value={value}
      sx={{
        backgroundColor: "#fff",
        border: "2px solid var(--black-10)",
        borderRadius: "12px",
        padding: "0 12px",
        // boxShadow: "inset rgba(30, 30, 30, 10%) 0 -2px 6px 2px",
        ...all.sx,
      }}
      inputProps={{
        sx: {
          height: "36px",
          padding: 0,
          ...all.inputProps?.sx,
        },
      }}
      inputRef={handleRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            className={classNames(classes.clear, {
              [classes.clear_visibility_hidden]: !isClearButton,
            })}
            aria-label="Очистить поле ввода"
            onClick={hendleReset}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      }
      onChange={hendleChange}
    />
  );
};
