import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseProps,
} from "@mui/material";
import classNames from "classnames";
import {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import debounce from "../../helpers/debounce";
import classes from "./Seatch.module.css";
import Suggestion from "./Suggestion/Suggestion";
import useForm from "./useForm";
import useSearch from "./useSearch";

interface SearchProps {
  className?: string;
  // headerSetOpen: () => void;
}

const Search: FC<SearchProps> = ({ className }) => {
  const { fetchData, data } = useSearch();

  const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debounce(fetchData(value), 150);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const inputRef = useRef<InputBaseProps>();
  const { isSearch, setSearch, isSuggest, setSuggest, hendleOpenForm } =
    useForm(inputRef?.current?.children[1]);

  const onKeyDownHendler = useCallback(
    (event: KeyboardEvent<HTMLFormElement>) => {
      if (event.key === "Escape") {
        if (isSuggest) setSuggest(false);
        else if (isSearch) setSearch(false);
      }
    },
    [isSuggest, setSuggest, isSearch, setSearch],
  );

  const onFocusHendler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.currentTarget === event.target) {
        setSuggest(true);
      }
    },
    [setSuggest],
  );

  const onBlurHendler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.currentTarget === event.target) {
        setSuggest(false);
      }
    },
    [setSuggest],
  );

  useEffect(() => {
    if (data && data.hits && data.hits.hits.length > 0) {
      setSuggest(true);
    }
  }, [data, setSuggest]);

  // useEffect(() => {
  //   headerSetOpen(isSearch);
  // }, [headerSetOpen, isSearch]);

  return (
    <div className={classNames(classes.block, className)}>
      <form
        className={classNames(
          classes.form,
          classes[`form_isVisible_${isSearch}`],
        )}
        action="/search/"
        onKeyDown={onKeyDownHendler}
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
            onFocus={onFocusHendler}
            onChange={onChangeHendler}
            onBlur={onBlurHendler}
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
            [classes.suggestion_isActive]: isSuggest,
          })}>
          {data && data.hits && data.hits.hits.length > 0 && (
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
        aria-label={isSearch ? "Закрыть поиск" : "Поиск"}
        onClick={hendleOpenForm}>
        {isSearch ? (
          <CloseIcon fontSize="small" />
        ) : (
          <SearchIcon fontSize="small" />
        )}
      </IconButton>
    </div>
  );
};

export default Search;
