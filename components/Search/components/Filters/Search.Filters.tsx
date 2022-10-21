import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { FC } from "react";

import { Maybe, Nullable } from "../../../../helpers/typings/utility-types";
import { IBucketsAggregations } from "../../../../lib/elastic/type";
import { useFilterHookResult } from "../../Search.utils/hooks/useFilter";
import classes from "./Search.filters.module.css";

type bucketType = Maybe<Nullable<IBucketsAggregations[]>>;

interface ISearchFilters {
  nodes: bucketType;
  label: string;
  filter: useFilterHookResult;
}

export const SearchFilters: FC<ISearchFilters> = ({ label, nodes, filter }) => {
  if (!nodes || nodes.length === 0) return null;
  return (
    <div className={classes.root}>
      <FormControl fullWidth size="small">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {nodes.map((node: IBucketsAggregations) => (
            <FormControlLabel
              key={node.key}
              label={`${node.key} (${node.doc_count})`}
              control={
                <Checkbox
                  checked={filter.list?.[node.key] ?? false}
                  name={node.key}
                  onChange={filter.hendleOnChange}
                />
              }
              // style={getStyles(name, bucket, theme)}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

// router.push({
//   query: {
//     query: router.query.query,
//     category,
//   },
// });
