import { CSSProperties } from "./helpers/typings/utility-types";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    responsiveText: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    responsiveText?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    responsiveText: true;
  }
}
