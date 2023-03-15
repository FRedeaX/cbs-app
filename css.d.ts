import { CSSProperties } from "react";

declare module "csstype" {
  interface Properties extends CSSProperties {
    "--scrollbar-width"?: string;
    "--image-viewer-height"?: string;
    "--is-header-fixed"?: 0 | 1;
    // "--is-search-input-focussed"?: 0 | 1;
    // "--search-suggestion-visibility"?: "hidden" | "visible";
  }
}
