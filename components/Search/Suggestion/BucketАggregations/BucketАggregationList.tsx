import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";

import { IBucketsAggregations } from "../../../../lib/elastic";
import classes from "./BucketАggregationList.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IBucketАggregationList {
  nodes: Array<IBucketsAggregations> | null | undefined;
}

const BucketАggregationList: FC<IBucketАggregationList> = ({ nodes }) => {
  // console.log(nodes);

  const [bucket, setBucket] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof bucket>) => {
    const {
      target: { value },
    } = event;
    setBucket(typeof value === "string" ? value.split(",") : value);
  };

  if (!nodes || nodes.length === 0) return null;
  return (
    <div className={classes.root}>
      {/* <CarouselRoot isOffsetSides length={nodes.length} itemMargin={5}>
        {nodes.map((node: IBucketsAggregations) => (
          <Chip
            key={node.key}
            sx={{ margin: "0 5px" }}
            label={`${node.key} (${node.doc_count})`}
          />
        ))}
      </CarouselRoot> */}

      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="bucket-aggregation-chip-label">Категории</InputLabel>
        <Select
          labelId="bucket-aggregation-chip-label"
          id="bucket-aggregation-multiple-chip"
          multiple
          value={bucket}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Категории"
              // sx={{ padding: "4px 16px 4px 8px" }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {nodes.map((node: IBucketsAggregations) => (
            <MenuItem
              key={node.key}
              value={node.key}
              // style={getStyles(name, bucket, theme)}
            >
              {`${node.key} (${node.doc_count})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default BucketАggregationList;
