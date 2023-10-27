import { BoxProps, ContainerProps, TypographyProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--transform-translate": `6px`,

  "--carousel-offset-y": `var(--transform-translate)`,
  "--card-direction": `column`,
  "--card-width": `288px`,
  "--card-transform-translate-y": `calc(var(--transform-translate) * -1)`,

  marginY: `var(--gap)`,

  "@media (max-width: 960px)": {
    width: `calc(100% + var(--gap))`,
  },
};

export const sxCarousel: BoxProps["sx"] = {
  "@media (min-width: 961px)": {
    marginLeft: `calc(var(--gap) / 2 * -1)`,
  },
};

export const sxScroller: BoxProps["sx"] = {
  justifyContent: `center`,
};

export const sxHeader: BoxProps["sx"] = {
  "--typography-line-height": 1.1,

  marginBottom: `var(--gap)`,
  paddingX: `calc(var(--gap) * 2.5)`,
  textAlign: "center",
};

export const sxTitle: TypographyProps["sx"] = {
  fontSize: `1.625rem`,
  fontWeight: 600,
};

export const sxSubtitle: TypographyProps["sx"] = {
  color: `var(--black-80)`,
};
