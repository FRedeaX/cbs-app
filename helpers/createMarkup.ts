import { DOMAttributes } from "react";

import { Maybe, Nullable } from "./typings/utility-types";

type CreateMarkupResult = DOMAttributes<unknown>["dangerouslySetInnerHTML"];

function createMarkup(text: Maybe<Nullable<string>>): CreateMarkupResult {
  if (typeof text === "string") return { __html: text };

  return undefined;
}

export default createMarkup;
