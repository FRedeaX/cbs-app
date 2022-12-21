/* eslint-disable no-underscore-dangle */
import { SearchCompletionSuggestOption } from "@elastic/elasticsearch/api/types";
import { Typography } from "@mui/material";
import { FC } from "react";

import { SuggestSource } from "../../../../../core/elastic/type";

type SuggestionTextProps = {
  suggest: SearchCompletionSuggestOption<SuggestSource>;
};

export const SuggestionText: FC<SuggestionTextProps> = ({ suggest }) => (
  <Typography
    sx={{
      // fontFamily: "var(--font-R-S);",
      fontWeight: 300,
      // padding: "var(--suggestion-item-padding)",
      // margin: "var(--suggestion-item-margin)",
      // transition: "background-color 150ms",
      // backgroundColor: index === highlightedIndex ? "var(--black-10)" : "",
    }}>
    {/* <span className={classes.highlight}>
      {suggest.text.substring(offset, length)}
    </span> */}
    {suggest.text}
  </Typography>
);
