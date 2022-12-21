/* eslint-disable no-underscore-dangle */
import classNames from "classnames";
import { FC } from "react";

import { useQuerySuggest } from "../../utils/hooks";
import { useSuggestion } from "../../utils/hooks/useSuggestion";
import classes from "./Suggestion.module.css";

export const Suggestion: FC = () => {
  const { data } = useQuerySuggest();
  const { highlightedIndex, onMouseOverSetHighlight } = useSuggestion();

  // console.log(data);

  if (data === undefined) return null;
  return (
    <div
      className={classNames(classes.root, {
        [classes.root_isVisible]: true,
      })}
      role="presentation">
      {data.map((suggest, index) => (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          key={suggest._id}
          data-index={index}
          onMouseOver={onMouseOverSetHighlight}
          className={classNames(classes.item, {
            [classes["item--select"]]: index === highlightedIndex,
          })}>
          {suggest._source?.title}
        </div>
      ))}
    </div>
  );
};
