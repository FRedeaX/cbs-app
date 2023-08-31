import { ruRU } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

import { BOTTOM_LIMIT_FONT_SIZE, TOP_LIMIT_FONT_SIZE } from "../../constants";

const fontSizeMultiplier =
  BOTTOM_LIMIT_FONT_SIZE / (TOP_LIMIT_FONT_SIZE - BOTTOM_LIMIT_FONT_SIZE);

export const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
    },
    typography: {
      fontFamily: `var(--font-family-roboto)`,
      h1: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 2.125rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 26 до 34
        // fontVariant: `small-caps slashed-zero`,
        fontFeatureSettings: `"smcp", "zero"`,
        fontWeight: 600,
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        letterSpacing: `0.034em`,
        textWrap: `balance`,
      },
      h2: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 2rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 24 до 32
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        textWrap: `balance`,
        letterSpacing: 0,
      },
      h3: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 1.875rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 22 до 30
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        textWrap: `balance`,
      },
      h4: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 1.75rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 20 до 28
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        textWrap: `balance`,
      },
      h5: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 1.6875rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 19 до 27
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        textWrap: `balance`,
      },
      h6: {
        color: `var(--black)`,
        fontFamily: `var(--typography-font-family, var(--font-family-serif))`,
        fontSize: `calc(
          var(--typography-font-size, 1.625rem) -
            (
              var(--downgrading-font-size) * 2 +
              var(--downgrading-font-size) * 2 * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 18 до 26
        lineHeight: `var(--typography-line-height, max(28px, 0.82em))`,
        textWrap: `balance`,
      },
      subtitle1: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 1rem)`,
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, 1.75)`,
        textWrap: `balance`,
        color: `var(--typography-color, var(--black))`,
      },
      subtitle2: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 0.875rem)`,
        fontWeight: `var(--typography-font-weight, 500)`,
        lineHeight: `var(--typography-line-height, 1.57)`,
        textWrap: `balance`,
        color: `var(--typography-color, var(--black))`,
      },
      body1: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 1rem)`,
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, 1.5)`,
        color: `var(--typography-color, var(--black))`,
      },
      body2: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 0.875rem)`,
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, 1.43)`,
        color: `var(--typography-color, var(--black))`,
      },
      button: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 0.875rem)`,
        fontWeight: `var(--typography-font-weight, 500)`,
        lineHeight: `var(--typography-line-height, 1.75)`,
        color: `var(--typography-color, var(--black))`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textTransform: `var(--typography-text-transform, uppercase)`,
      },
      caption: {
        display: "block",
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 0.75rem)`,
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, 1.66)`,
        color: `var(--typography-color, var(--black))`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textTransform: `var(--typography-text-transform, initial)`,
        textWrap: `balance`,
      },
      overline: {
        display: "block",
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `var(--typography-font-size, 0.75rem)`,
        fontWeight: `var(--typography-font-weight, 400)`,
        lineHeight: `var(--typography-line-height, 2.66)`,
        color: `var(--typography-color, var(--black))`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textTransform: `var(--typography-text-transform, uppercase)`,
      },
      sectionTitle: {
        fontFamily: `var(--font-family-serif)`,
        fontSize: `1.25rem`,
        fontWeight: `400`,
        cursor: "default",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textWrap: `balance`,
        color: `rgba(30, 30, 30, 0.9)`,
        paddingLeft: `calc(var(--gap) * 2.5)`,
      },
      responsiveText: {
        fontFamily: `var(--typography-font-family, var(--font-family-roboto))`,
        fontSize: `calc(
          var(--typography-font-size, 1.25rem) -
            (
              var(--downgrading-font-size) +
              var(--downgrading-font-size) * ${fontSizeMultiplier}
            ) * ((${TOP_LIMIT_FONT_SIZE}px - 100vw) / ${TOP_LIMIT_FONT_SIZE}) *
            var(--is-font-size-adaptive)
        )`, // от 16 до 20
        fontWeight: `var(--typography-font-weight, 400)`,
        fontStyle: `var(--typography-font-style, inherit)`,
        lineHeight: `var(--typography-line-height, max(28px, 1.5em))`,
        color: `var(--typography-color, var(--black))`,
        textDecoration: `var(--typography-text-decoration)`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textTransform: `var(--typography-text-transform, initial)`,
        letterSpacing: `var(--typography-letter-spacing)`,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 800,
        md: 960,
        lg: 1310,
        xl: 1500,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            sectionTitle: "h2",
            responsiveText: "p",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            ...(!ownerState.disableGutters && {
              [theme.breakpoints.up("sm")]: {
                paddingLeft: `var(--g-layout-padding-sides)`,
                paddingRight: `var(--g-layout-padding-sides)`,
              },
            }),
          }),
        },
      },
    },
  },
  ruRU,
);
