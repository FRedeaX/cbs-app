import csstype from "csstype";

import { CSSProperties } from "@/helpers/typings/utility-types";

declare module "csstype" {
  interface Properties extends CSSProperties {
    "--gap"?: string;
    "--scrollbar-width"?: string;
    "--image-max-width"?: csstype.Properties["maxWidth"];
    "--image-viewer-height"?: string;
    "--has-header-hidden"?: 1;
    "--typography-font-size"?: csstype.Properties["fontSize"];
    "--typography-font-style"?: csstype.Properties["fontStyle"];
    "--typography-font-weight"?: csstype.Properties["fontWeight"];
    "--typography-text-decoration"?: csstype.Properties["textDecoration"];
    "--typography-text-transform"?: csstype.Properties["textTransform"];
    "--typography-letter-spacing"?: csstype.Properties["letterSpacing"];
    "--is-font-size-adaptive"?: 0 | 1;
    // "--is-search-input-focussed"?: 0 | 1;
    // "--search-suggestion-visibility"?: "hidden" | "visible";
    "--carousel-shadow-display"?: csstype.Properties["display"];
  }
}
