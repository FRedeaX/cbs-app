/* eslint-disable react/jsx-props-no-spreading */
import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC, forwardRef } from "react";

type NJSLinkProps = Pick<
  NextLinkProps,
  "href" | "replace" | "scroll" | "shallow" | "prefetch"
>;
export type LinkProps = Omit<MUILinkProps, keyof NJSLinkProps> & NJSLinkProps;

export const Link: FC<LinkProps> = forwardRef(
  ({ href, replace, scroll, shallow, prefetch, ...props }, ref) => (
    <NextLink
      ref={ref}
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      passHref>
      <MUILink {...props} />
    </NextLink>
  ),
);

Link.displayName = "Link";
