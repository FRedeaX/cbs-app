import { CSSProperties } from "./helpers/typings/utility-types";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    sectionTitle: CSSProperties;
    responsiveText: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    sectionTitle?: CSSProperties;
    responsiveText?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sectionTitle: true;
    responsiveText: true;
  }
}
