import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { FC, ReactNode } from "react";

import {
  BucketsAggregations,
  ListBucketsAggregations,
} from "../../../../../core/elastic/search/type";
import {
  CSSProperties,
  Maybe,
  Nullable,
} from "../../../../../helpers/typings/utility-types";
import { CustomeScrollbar } from "../../../../CustomeScrollbar/CustomeScrollbar";
import { useFilter } from "../utils/useFilter";
import classes from "./Search.filter.module.css";

const sxFormLabel: CSSProperties = { fontWeight: 500, color: "var(--black)" };
const sxFormGroup: CSSProperties = {
  marginLeft: "calc(var(--search-filter-ripple-offset) * -1)",
  paddingLeft:
    "calc(var(--search-filter-ripple-offset) + var(--search-filter-checkbox-padding))",
};
const sxCheckbox: CSSProperties = {
  padding: "var(--search-filter-checkbox-padding)",
};

interface ISearchFilters {
  /**
   * Название фильтра.
   */
  legend: ReactNode;

  /**
   * Параметр поиска.
   */
  name: "departments" | "categories";

  /**
   * Список доступных фильтров.
   */
  nodes: Maybe<Nullable<ListBucketsAggregations>>;

  /**
   * Список всех фильтров.
   */
  facet: Maybe<Nullable<BucketsAggregations>>;
}

export const SearchFilters: FC<ISearchFilters> = ({
  legend,
  name,
  nodes,
  facet: facetList,
}) => {
  const filter = useFilter(name);

  if (!facetList || facetList.length === 0) return null;
  return (
    <div className={classes.root}>
      <FormControl fullWidth size="small">
        <FormLabel component="legend" sx={sxFormLabel}>
          {legend}
        </FormLabel>
        <CustomeScrollbar>
          <FormGroup sx={sxFormGroup} className={classes.formGroup}>
            <div className={classes.body}>
              {facetList.map((facet) => (
                <FormControlLabel
                  key={facet.key}
                  label={
                    <>
                      <span className={classes.text}>{facet.key}</span>
                      {nodes?.[facet.key] ? (
                        <span className={classes.docCount}>
                          {nodes && nodes[facet.key]
                            ? nodes[facet.key]
                            : facet.doc_count}
                        </span>
                      ) : (
                        filter.list?.[facet.key] && (
                          <span className={classes.docCount}>0</span>
                        )
                      )}
                    </>
                  }
                  control={
                    <Checkbox
                      sx={sxCheckbox}
                      checked={filter.list?.[facet.key] ?? false}
                      disabled={
                        !!(nodes && !nodes[facet.key]) &&
                        !filter.list?.[facet.key]
                      }
                      name={facet.key}
                      onChange={filter.handleOnChange}
                    />
                  }
                />
              ))}
            </div>
          </FormGroup>
        </CustomeScrollbar>
      </FormControl>
    </div>
  );
};
