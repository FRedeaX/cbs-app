import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, InputBase } from "@mui/material";
import classNames from "classnames";
import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";
import { delay } from "../../../helpers";
import debounce from "../../../helpers/debounce";
import SearchToggleFrom from "../Search.ToggleFrom";
import Suggestion from "../Suggestion/Suggestion";
import SuggestionList from "../Suggestion/SuggestionList";
import useForm from "../useForm";
import useSearch from "../useSearch";
import classes from "./Search.mobile.module.css";

const SearchMobile: FC = () => {
  const { fetchData, resetData, data } = useSearch();

  const onChangeHendler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      debounce(fetchData(value), 150);
    },
    [fetchData],
  );

  const handleSubmit = useCallback((event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  const inputRef = useRef();
  const { isSearch, isSuggest, resetInput, toggleForm, onFocusHendler } =
    useForm(inputRef?.current?.children[1]);

  const hendleReset = useCallback(() => {
    resetData();
    resetInput();
  }, [resetData, resetInput]);

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
              <IconButton onClick={hendleReset}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
          ref={inputRef}
          onFocus={onFocusHendler}
          onChange={onChangeHendler}
        />
        <Suggestion isSuggest={isSuggest}>
          <SuggestionList nodes={data?.hits?.hits} />
        </Suggestion>
      </form>
      <SearchToggleFrom isSearch={isSearch} onClick={toggleForm}>
        <SearchIcon fontSize="small" />
      </SearchToggleFrom>
    </div>
  );
};

export default SearchMobile;
