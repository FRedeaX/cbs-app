/* eslint-disable no-underscore-dangle */
import { Typography } from "@mui/material";
import { FC } from "react";

import { SuggestResponseData } from "../../../../core/elastic/type";
import { Maybe } from "../../../../helpers/typings/utility-types";

type SuggestionListProps = { data: Maybe<SuggestResponseData> };

export const SuggestionList: FC<SuggestionListProps> = ({ data }) => {
  if (data === undefined) return null;
  console.log(data);

  const { length } = data.title[0].options;
  return (
    <>
      {data.title[0].options.map((suggest) => (
        <Typography
          key={suggest._id}
          sx={{
            padding: "var(--suggestion-item-padding)",
            margin: "var(--suggestion-item-margin)",
          }}>
          {length > 4 ? suggest.text : suggest._source?.title}
        </Typography>
      ))}
    </>
  );
};
