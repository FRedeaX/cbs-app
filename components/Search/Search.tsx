import {
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseProps,
} from "@mui/material";
import { ChangeEvent, ReactElement, useRef } from "react";
import classNames from "classnames";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./Seatch.module.css";
import debounce from "../../helpers/debounce";
import useSearch from "./useSearch";
import useForm from "./useForm";
import Suggestion from "./Suggestion/Suggestion";

const Search = (): JSX.Element => {
  const { fetchData, data } = useSearch();

  const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debounce(fetchData(value), 150);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const inputRef = useRef<InputBaseProps>();
  const { isForm, hendleOpenForm } = useForm(inputRef);

  return (
    <div className={classes.block}>
      <form
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isForm}`],
        )}
        action="/search/"
        style={{ textAlign: "initial" }}
        onSubmit={handleSubmit}>
        <div className={classes.input}>
          <InputBase
            // label={}
            // sx={{ width: "calc(100% - 36px)" }}
            name="query"
            autoComplete="off"
            placeholder="Поиск..."
            id="search-input"
            // variant="standard"
            // size="small"
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
            ref={inputRef}
            onChange={onChangeHendler}
            onFocus={(e) => console.log("focus", e.currentTarget === e.target)}
          />
          {/* <IconButton
          type="button"
          sx={{ width: "36px", marginLeft: "8px", padding: "8px" }}
          aria-label="Поиск">
          <SearchIcon />
        </IconButton> */}
        </div>
        {console.log(data)}
        <div
          className={classNames(classes.suggestion, {
            [classes.suggestion_isActive]: isForm,
          })}>
          {data && data.hits.hits.length > 0 && (
            <Suggestion nodes={data.hits.hits} />
          )}
        </div>
      </form>

      <IconButton
        type="button"
        sx={{
          width: "36px",
          height: "36px",
          marginLeft: "8px",
          padding: "8px",
        }}
        aria-label="Поиск"
        onClick={hendleOpenForm}>
        {isForm ? (
          <CloseIcon fontSize="small" />
        ) : (
          <SearchIcon fontSize="small" />
        )}
      </IconButton>
    </div>
  );
};

export default Search;
