/* eslint-disable react/jsx-props-no-spreading */
import { FC } from "react";

import { Link, LinkProps } from "@/components/UI/Link/Link";

type CardLinkProps = LinkProps;

export const CardLink: FC<CardLinkProps> = ({ children, sx, ...props }) => (
  <Link
    {...props}
    underline="none"
    sx={{
      ...sx,
      "::after": {
        content: '""',

        position: "absolute",
        zIndex: 1,

        width: "100%",
        height: "100%",
      },
    }}>
    {children}
  </Link>
);
