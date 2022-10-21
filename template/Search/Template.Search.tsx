import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, useMediaQuery } from "@mui/material";
import { FC, useEffect } from "react";

import { getFilterStringFromList } from "../../components/Search/Search.utils";
import {
  useFilter,
  useInput,
  useSearch,
} from "../../components/Search/Search.utils/hooks";
import {
  SearchFilters,
  SearchForm,
  SearchInput,
  SearchSuggestionList,
} from "../../components/Search/components";
import { submitButton } from "../../components/Search/style";
import { TemplateContainer } from "../../components/TemplateContainer/TemplateContainer";
import classes from "./Template.Search.module.css";

export const TemplateSearch: FC = () => {
  const { inputValue, hendleSetValue } = useInput();
  const category = useFilter("category");

  const { search, data } = useSearch();

  const isHorizontal = useMediaQuery("(min-width: 1100px)");

  useEffect(() => {
    search({
      text: inputValue,
      category: getFilterStringFromList(category.list),
    });
  }, [inputValue, category.list, search]);

  // console.log(data);

  return (
    <div className={classes.root}>
      <TemplateContainer>
        <SearchForm>
          <SearchInput value={inputValue} hendleSetValue={hendleSetValue} />
          <IconButton type="submit" sx={submitButton} aria-label="Найти">
            <SearchRoundedIcon fontSize="small" />
          </IconButton>
        </SearchForm>

        <div className={classes.body}>
          <aside className={classes.aside}>
            <SearchFilters
              nodes={data?.aggregations.category.buckets}
              label="Категории"
              filter={category}
            />
          </aside>
          <div className={classes.main}>
            <SearchSuggestionList
              data={data?.hits}
              isHorizontal={isHorizontal}
            />
          </div>
        </div>
      </TemplateContainer>
    </div>
  );
};
