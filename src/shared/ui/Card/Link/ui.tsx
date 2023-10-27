/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { Link, LinkProps } from "@/components/UI/Link/Link";

export type CardLinkProps = LinkProps;

export const CardLink: FC<CardLinkProps> = ({ children, sx, ...props }) => (
  <Link
    {...props}
    underline="none"
    sx={{
      ...sx,
      "--typography-font-weight": "var(--card-link-font-weight, 500)",
      "--typography-font-size": "var(--card-link-font-size, 0.9375rem)",
      "--typography-line-height": 1.3,

      display: "block",
      paddingBottom: "4px",

      ":last-child": {
        paddingBottom: 0,
      },

      "::after": {
        content: '""',

        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    }}>
    {children}
  </Link>
);
