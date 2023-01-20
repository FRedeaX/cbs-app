import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./Suggestion.Fade.module.css";

type SuggestionFadeProps = {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
};

export const SuggestionFade: FC<SuggestionFadeProps> = ({
  children,
  isVisible,
  className,
}) => (
  <div
    className={classNames(
      classes.root,
      classes[`root--isVisible_${isVisible}`],
      className,
    )}>
    {children}
  </div>
);
