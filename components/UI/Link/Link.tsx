/* eslint-disable react/jsx-props-no-spreading */
import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

type NJSLinkProps = Pick<
  NextLinkProps,
  "href" | "replace" | "scroll" | "shallow" | "prefetch"
>;
export type LinkProps = Omit<MUILinkProps, keyof NJSLinkProps> & NJSLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <MUILink component={NextLink} ref={ref} {...props} />
));

Link.displayName = "Link";
