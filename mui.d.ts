import { TypographyStyle } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    sectionTitle: TypographyStyle;
    responsiveText: TypographyStyle;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    sectionTitle?: TypographyStyle;
    responsiveText?: TypographyStyle;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sectionTitle: true;
    responsiveText: true;
  }
}
