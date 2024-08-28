import { TypographyStyle } from "@mui/material";

import type { Theme, SxProps } from "@mui/material/styles";

declare global {
  namespace React {
    interface HTMLAttributes {
      sx?: SxProps<Theme>;
    }
    interface SVGProps {
      sx?: SxProps<Theme>;
    }
  }
}

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
