import { ReactNode } from "react";

type createMarkupResult = { __html: string } | undefined;

function createMarkup(text: string | ReactNode | null): createMarkupResult {
  if (text === null || typeof text !== "string") return undefined;

  return { __html: text };
}

export default createMarkup;
