/* eslint-disable react/require-default-props */
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import { FC, memo } from "react";

import { useFormold, useSearch } from "../Search.utils/hooks";
import {
  SearchForm,
  SearchInput,
  SearchLoader,
  SearchSuggestion,
  SearchSuggestionList,
  SearchToggleFrom,
} from "../components";
import classes from "./Search.module.css";

interface ISearchProps {
  className?: string;
  // headerSetOpen: () => void;
}

const Search: FC<ISearchProps> = ({ className }) => {
  // +
  const { search, data, isLoading } = useSearch();

  const {
    inputRef,
    isSearch,
    isSuggest,
    resetInput,
    toggleForm,
    onKeyDownHendler,
    onFocusHendler,
    onBlurHendler,
  } = useFormold();

  return (
    <div
      className={classNames(classes.block, className)}
      onKeyDown={onKeyDownHendler}
      tabIndex={-1}
      role="presentation">
      <div
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isSearch}`],
        )}>
        <SearchForm>
          <SearchInput
            // search={search}
            // resetInput={resetInput}
            id="search-input-desktop"
            // startAdornment={
            //   <InputAdornment position="start">
            //     <SearchRoundedIcon fontSize="small" />
            //   </InputAdornment>
            // }
            inputRef={inputRef}
            onFocus={onFocusHendler}
            onBlur={onBlurHendler}
          />
          <SearchSuggestion isSuggest={isSuggest}>
            <SearchSuggestionList data={data?.hits} />
            <SearchLoader isLoading={isLoading} />
          </SearchSuggestion>
          <IconButton
            type="submit"
            sx={{
              width: "36px",
              height: "36px",
              marginLeft: "8px",
              padding: "8px",
              position: "absolute",
            }}
            // aria-label={isSearch ? "Закрыть поиск" : "Поиск"}
          />
          {/* <SearchRoundedIcon fontSize="small" />
          </IconButton> */}
        </SearchForm>
      </div>
      <SearchToggleFrom isSearch={isSearch} onClick={toggleForm}>
        {/* {isSearch ? (
          <CloseRoundedIcon fontSize="small" />
        ) : (
          )} */}
        <SearchRoundedIcon fontSize="small" />
      </SearchToggleFrom>
    </div>
  );
};

export default memo(Search);
