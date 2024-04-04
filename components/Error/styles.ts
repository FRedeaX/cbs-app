import { SxProps } from "@mui/system";

export const root: SxProps = {
  display: `flex`,
  height: `calc(100vh - var(--header-height))`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
};

export const body: SxProps = {
  "--typography-line-height": `48px`,

  display: `flex`,
};

export const statusCode: SxProps = {
  "--typography-font-size": `24px`,

  margin: `0px 20px 0px 0px`,
  paddingRight: `23px`,
  borderRight: `1px solid rgba(0, 0, 0, 0.3)`,
};
