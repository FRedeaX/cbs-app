import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "../../../helpers";

export type HtmlProps = {
  content: string;
  /**
   * Дополнительный класс.
   */
  className?: string | classNames.ArgumentArray;
};

export const Html: FC<HtmlProps> = ({ content, className }) => (
  <div
    className={classNames(className)}
    dangerouslySetInnerHTML={createMarkup(content)}
  />
);
