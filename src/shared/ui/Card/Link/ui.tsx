import { FC } from "react";

import { Link, LinkProps } from "@/components/UI/Link/Link";

export type CardLinkProps = LinkProps;

export const CardLink: FC<CardLinkProps> = ({ children, sx, ...props }) => (
  <Link
    underline="none"
    sx={{
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
      ...sx,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}>
    {children}
  </Link>
);
