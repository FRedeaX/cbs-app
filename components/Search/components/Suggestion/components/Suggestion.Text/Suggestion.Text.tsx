/* eslint-disable no-underscore-dangle */
import NorthWestRoundedIcon from "@mui/icons-material/NorthWestRounded";
import { FC } from "react";

import { Link } from "@/components/UI/Link/Link";

import { SuggestHit, SuggestSource } from "../../../../../../core/elastic/type";
import { CSSProperties } from "../../../../../../helpers/typings/utility-types";
import { useSuggestion } from "../../utils/useSuggestion";

import classes from "./Suggestion.Text.module.css";
import { TextHighlight } from "./Text.Highlight/Text.Highlight";

const sxRoot: CSSProperties = {
  borderBottomColor: "divider",
};
const sxLink: CSSProperties = {
  color: "black",
  padding: "6px 4px 6px 0",
  flex: 1,
};

type SuggestionTextProps = {
  suggestion: SuggestHit<SuggestSource>;
};

export const SuggestionText: FC<SuggestionTextProps> = ({ suggestion }) => {
  const { onClickLink } = useSuggestion();

  return (
    <div sx={sxRoot} className={classes.root}>
      <Link
        href={suggestion._source.link}
        prefetch={false}
        sx={sxLink}
        underline="none"
        onClick={onClickLink}>
        <TextHighlight
          highlight={suggestion.highlight.title}
          text={suggestion._source.title}
        />
      </Link>
      <NorthWestRoundedIcon fontSize="small" color="disabled" />
    </div>
  );
};
