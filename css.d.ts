import csstype from "csstype";

import { CSSProperties } from "./helpers/typings/utility-types";

declare module "csstype" {
  interface Properties extends CSSProperties {
    "--scrollbar-width"?: string;
    "--image-viewer-height"?: string;
    "--is-header-fixed"?: 0 | 1;
    "--typography-font-size"?: csstype.Properties["fontSize"];
    "--typography-font-style"?: csstype.Properties["fontStyle"];
    "--typography-font-weight"?: csstype.Properties["fontWeight"];
    "--typography-text-decoration"?: csstype.Properties["textDecoration"];
    "--typography-text-transform"?: csstype.Properties["textTransform"];
    "--typography-letter-spacing"?: csstype.Properties["letterSpacing"];
    // "--is-search-input-focussed"?: 0 | 1;
    // "--search-suggestion-visibility"?: "hidden" | "visible";
  }
}
