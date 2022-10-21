import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, InputAdornment } from "@mui/material";
import classNames from "classnames";
import { FC, memo, useEffect } from "react";

import { useFormold, useSearch } from "../Search.utils/hooks";
import {
  SearchForm,
  SearchInput,
  SearchLoader,
  SearchSuggestion,
  SearchSuggestionList,
  SearchToggleFrom,
} from "../components";
import classes from "./Search.mobile.module.css";

const SearchMobile: FC = () => {
  const { search, data, isLoading } = useSearch();

  const { inputRef, isSearch, isSuggest, resetInput, toggleForm } =
    useFormold();

  useEffect(() => {
    if (isSearch) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isSearch]);

  return (
    <div className={classes.root}>
      <div
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isSearch}`],
        )}>
        <SearchForm>
          <SearchInput
            // search={search}
            // resetInput={resetInput}
            id="search-input-mobile"
            sx={{
              padding: "0 10px",
              boxShadow: "none",
              borderRadius: "none",
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
            inputRef={inputRef}
          />
          <SearchSuggestion isSuggest={isSuggest}>
            <SearchSuggestionList data={data?.hits} />
            <SearchLoader isLoading={isLoading} />
          </SearchSuggestion>
        </SearchForm>
      </div>
      <SearchToggleFrom isSearch={isSearch} onClick={toggleForm}>
        <SearchRoundedIcon fontSize="small" />
      </SearchToggleFrom>
    </div>
  );
};

export default memo(SearchMobile);
