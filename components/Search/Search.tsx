/* eslint-disable react/require-default-props */
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  InputBase,
  InputBaseComponentProps,
} from "@mui/material";
import classNames from "classnames";
import { ChangeEvent, FC, useCallback, useRef } from "react";
import debounce from "../../helpers/debounce";
import classes from "./Search.module.css";
import SearchToggleFrom from "./Search.ToggleFrom";
import Suggestion from "./Suggestion/Suggestion";
import SuggestionList from "./Suggestion/SuggestionList";
import useForm from "./useForm";
import useSearch from "./useSearch";

interface SearchProps {
  className?: string;
  // headerSetOpen: () => void;
}

const Search: FC<SearchProps> = ({ className }) => {
  // +
  const { fetchData, resetData, data } = useSearch();

  // +
  const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debounce(fetchData(value), 150);
  };

  // +
  const handleSubmit = useCallback((event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  // +
  const inputRef = useRef<InputBaseComponentProps>();
  const {
    isSearch,
    isSuggest,
    resetInput,
    toggleForm,
    onKeyDownHendler,
    onFocusHendler,
    onBlurHendler,
  } = useForm(inputRef?.current);

  // useEffect(() => {
  //   if (data && data.hits && data.hits.hits.length > 0) {
  //     setSuggest(true);
  //   }
  // }, [data, setSuggest]);

  // +
  const hendleToggleForm = useCallback(() => {
    resetData();
    resetInput();
    toggleForm();
  }, [resetData, resetInput, toggleForm]);

  return (
    <div
      className={classNames(classes.block, className)}
      onKeyDown={onKeyDownHendler}
      role="presentation">
      <form
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isSearch}`],
        )}
        action="/search/"
        onSubmit={handleSubmit}>
        <div className={classes.input}>
          <InputBase
            name="query"
            autoComplete="off"
            placeholder="Поиск..."
            id="search-input"
            fullWidth
            sx={{
              borderRadius: "12px",
              padding: "0 12px",
              backgroundColor: "#fff",
              boxShadow: "inset rgba(30, 30, 30, 10%) 0 -2px 6px 2px",
            }}
            inputProps={{
              sx: {
                width: "100%",
                height: "36px",
                padding: 0,
                border: "none",
                backgroundColor: "transparent",
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
            inputRef={inputRef}
            onFocus={onFocusHendler}
            onChange={onChangeHendler}
            onBlur={onBlurHendler}
          />
        </div>
        <Suggestion isSuggest={isSuggest}>
          <SuggestionList nodes={data?.hits?.hits} />
        </Suggestion>
      </form>
      <SearchToggleFrom isSearch={isSearch} onClick={hendleToggleForm}>
        {isSearch ? (
          <CloseIcon fontSize="small" />
        ) : (
          <SearchIcon fontSize="small" />
        )}
      </SearchToggleFrom>
    </div>
  );
};

export default Search;
