import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Fade, IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FC, useContext, useRef } from "react";

import { useSuggestion } from "../../../utils/hooks/useSuggestion";
import { InputContext } from "../Context/Input.Context";

export const InputTextField: FC = () => {
  const inputRef = useRef<HTMLInputElement>();
  const { value, setValue } = useContext(InputContext);
  const { onKeyDownSetHighlight } = useSuggestion();

  const hendleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const hendleReset = () => {
    setValue("");
    if (inputRef.current === undefined) return;
    inputRef.current.focus();
  };

  const isClearButton = !!value;

  return (
    <TextField
      name="text"
      autoComplete="off"
      placeholder="Поиск..."
      fullWidth
      value={value}
      onKeyDown={onKeyDownSetHighlight}
      onChange={hendleChange}
      // onFocus={(event) => {
      //   document.body.style.ad;
      // }}
      inputProps={{
        sx: {
          height: "var(--search-input-height)",
          padding: "0 0 0 14px",
        },
      }}
      InputProps={{
        sx: {
          backgroundColor: "#fff",
          borderRadius: "var(--search-input-border-radius)",
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!isClearButton}
              aria-label="Очистить поле ввода"
              onClick={hendleReset}>
              <Fade in={isClearButton}>
                <CloseRoundedIcon fontSize="small" />
              </Fade>
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={inputRef}
    />
  );
};
