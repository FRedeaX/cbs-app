import { Maybe } from "./typings/utility-types";

export const hasAppendPathname = (
  url: Maybe<string>,
  pathname: string,
): Maybe<string> => {
  if (typeof url === "string") return `${url}/${pathname}`;
  return url;
};
