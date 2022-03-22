/* eslint-disable no-underscore-dangle */
import {
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
} from "@mui/material";
import { FC, ChangeEvent } from "react";
import classNames from "classnames";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./Seatch.module.css";
import debounce from "../../helpers/debounce";
import useSearch from "./useSearch";

const Search: FC = () => {
  const { fetchData, data } = useSearch();

  const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debounce(fetchData(value), 150);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className={classes.form}
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
            boxShadow: "inset rgb(30 30 30 / 10%) 0 -2px 6px 2px",
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
          onChange={onChangeHendler}
        />
        {/* <IconButton
          type="button"
          sx={{ width: "36px", marginLeft: "8px", padding: "8px" }}
          aria-label="Поиск">
          <SearchIcon />
        </IconButton> */}
      </div>
      <div
        className={classNames(classes.suggestion, {
          [classes.suggestion_isActive]: data && data.hits.total.value > 0,
        })}>
        {data &&
          data.hits.hits.map((item) => (
            <div key={item?._id}>{item?._source.post_title}</div>
          ))}
      </div>
    </form>
  );
};

export default Search;
