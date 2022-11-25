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
} from "../../../../core/elastic/type";
import { Maybe, Nullable } from "../../../../helpers/typings/utility-types";
import { useFilter } from "../../utils/hooks/useFilter";
import classes from "./Search.filter.module.css";

interface ISearchFilters {
  legend: ReactNode;
  name: string;
  // facet: BucketList;
  nodes: Maybe<Nullable<ListBucketsAggregations>>;
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
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup sx={{ display: "block" }} className={classes.formGroup}>
          <div className={classes.body}>
            {facetList.map((facet) => (
              <FormControlLabel
                key={facet.key}
                // disableTypography
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
                    sx={{ padding: "4px 6px 4px 9px" }}
                    checked={filter.list?.[facet.key] ?? false}
                    disabled={
                      !!(nodes && !nodes[facet.key]) &&
                      !filter.list?.[facet.key]
                    }
                    name={facet.key}
                    // size="small"
                    onChange={filter.hendleOnChange}
                  />
                }
              />
            ))}
          </div>
        </FormGroup>
      </FormControl>
    </div>
  );
};
