import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Fade, IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, KeyboardEvent, useCallback, useEffect } from "react";

import { handleFocus } from "../../../../../../base/utils";
import { CSSProperties } from "../../../../../../helpers/typings/utility-types";
import { useSuggestion } from "../../../Suggestion/utils/useSuggestion";
import { useInputContext } from "../../context";
import { useInput } from "../../utils";

const sxInput: CSSProperties = {
  height: "var(--search-input-height)",
  padding: "0 0 0 14px",
};
const sxInputWrapper: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "var(--search-input-border-radius)",
};

export type InputTextFieldProps = {
  /**
   * @default false
   */
  autoFocus?: boolean;
};

export const InputTextField: FC<InputTextFieldProps> = ({
  autoFocus = false,
}) => {
  const { onKeyDownSetHighlight } = useSuggestion();
  const { value, handleSetFocus, handleRemoveFocus } = useInputContext();
  const { ref, handleChange, handleReset } = useInput();
  const isClearButton = !!value;

  useEffect(() => {
    if (autoFocus && !ref.current?.value) handleFocus(ref);
  }, [autoFocus, ref]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Escape") handleRemoveFocus();
      else onKeyDownSetHighlight(event);
    },
    [handleRemoveFocus, onKeyDownSetHighlight],
  );

  return (
    <TextField
      name="text"
      autoComplete="off"
      placeholder="Поиск..."
      fullWidth
      value={value}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      onFocus={handleSetFocus}
      inputProps={{ sx: sxInput }}
      InputProps={{
        sx: sxInputWrapper,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!isClearButton}
              aria-label="Очистить поле ввода"
              onClick={handleReset}>
              <Fade in={isClearButton}>
                <CloseRoundedIcon fontSize="small" />
              </Fade>
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={ref}
    />
  );
};
