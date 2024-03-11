import { CSSSelectorObjectOrCssVariables } from "@mui/system";

export const block: CSSSelectorObjectOrCssVariables = {
  marginTop: `var(--block-margin-top, var(--g-block-margin-top))`,
  marginBottom: `var(--block-margin-bottom, var(--g-block-margin-bottom))`,

  "&:first-child": {
    marginTop: 0,
  },
  "&:last-child": {
    marginBottom: 0,
  },
};

const blockMarginTop = {
  "--block-margin-top": `calc(
    var(--g-block-margin-top) - var(--g-block-margin-bottom)
  )`,
};

export const heading: CSSSelectorObjectOrCssVariables = {
  "& + &": blockMarginTop,
  "+ .MuiTypography-responsiveText": blockMarginTop,
};
