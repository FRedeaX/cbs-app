import { ContainerProps, SxProps, TypographyProps } from "@mui/material";

export const sxContainer: ContainerProps["sx"] = {
  "--transform-translate": `var(--group-cards-transform-translate, 6px)`,

  "--carousel-offset-y": `var(--transform-translate)`,
  "--card-direction": `column`,
  "--card-width": `288px`,
  "--card-margin-y": `calc(var(--gap) / 2)`,
  "--card-margin-x": `calc(var(--gap) / 2)`,
  "--card-transform-translate-y": `calc(var(--transform-translate) * -1)`,

  marginY: `var(--gap)`,

  "@media (max-width: 960px)": {
    width: `calc(100% + var(--gap))`,
  },
};

export const sxHeader: SxProps = {
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

export const sxCarousel: SxProps = {
  "@media (min-width: 961px)": {
    marginLeft: `calc(var(--gap) / 2 * -1)`,
  },
};

export const sxScroller: SxProps = {
  justifyContent: `center`,
};
