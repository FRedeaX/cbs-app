import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseComponentProps,
} from "@mui/material";
import classNames from "classnames";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { debounce } from "../../../helpers";
import SearchToggleFrom from "../Search.ToggleFrom";
import Suggestion from "../Suggestion/Suggestion";
import SuggestionList from "../Suggestion/SuggestionList";
import useForm from "../useForm";
import useSearch from "../useSearch";
import classes from "./Search.mobile.module.css";

const SearchMobile: FC = () => {
  const [isClearButton, setClearButton] = useState<boolean>(false);
  const { suggestData, resetData, data } = useSearch();

  const inputRef = useRef<InputBaseComponentProps>();
  const {
    isSearch,
    isSuggest,
    setFocus,
    resetInput,
    toggleForm,
    onFocusHendler,
  } = useForm(inputRef?.current);

  const onChangeHendler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length === 0) {
        setClearButton(false);
        resetData();
        return;
      }

      debounce(suggestData(value), 150);
      setClearButton(true);
    },
    [suggestData, resetData],
  );

  const handleSubmit = useCallback((event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  const hendleReset = useCallback(() => {
    resetData();
    resetInput();
    setClearButton(false);
  }, [resetData, resetInput]);

  const hendleOpenForm = useCallback(() => {
    toggleForm();
    setFocus();
  }, [toggleForm, setFocus]);

  useEffect(() => {
    if (isSearch) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isSearch]);

  return (
    <div className={classes.block}>
      <form
        action="/search/"
        onSubmit={handleSubmit}
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isSearch}`],
        )}>
        <InputBase
          name="query"
          autoComplete="off"
          placeholder="Поиск..."
          id="search-input"
          fullWidth
          sx={{
            backgroundColor: "#fff",
            padding: "0 10px",
          }}
          inputProps={{
            sx: {
              height: "80px",
              padding: "0 8px",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="Закрыть поиск" onClick={toggleForm}>
                <ArrowBackRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
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
          inputRef={inputRef}
          onFocus={onFocusHendler}
          onChange={onChangeHendler}
        />
        <Suggestion isSuggest={isSuggest}>
          <SuggestionList nodes={data?.hits?.hits} />
        </Suggestion>
      </form>
      <SearchToggleFrom isSearch={isSearch} onClick={hendleOpenForm}>
        <SearchIcon fontSize="small" />
      </SearchToggleFrom>
    </div>
  );
};

export default memo(SearchMobile);
