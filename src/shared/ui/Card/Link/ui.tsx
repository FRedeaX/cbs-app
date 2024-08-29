import { Link, LinkProps } from "@/components/UI/Link/Link";
import { styled } from "@mui/material-pigment-css";

export type CardLinkProps = LinkProps;

export const CardLink = styled(Link)(() => ({
  color: `inherit`,

  "::after": {
    content: `""`,

    position: `absolute`,
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}));
