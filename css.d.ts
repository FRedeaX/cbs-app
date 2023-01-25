import { CSSProperties } from "react";

declare module "csstype" {
  interface Properties extends CSSProperties {
    "--scrollbar-width"?: string;
    // "--is-search-input-focussed"?: 0 | 1;
    // "--search-suggestion-visibility"?: "hidden" | "visible";
  }
}
