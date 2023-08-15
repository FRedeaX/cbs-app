/* eslint-disable react/jsx-props-no-spreading */
import classNames from "classnames";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { Children, FC, ReactElement, cloneElement } from "react";

import { Link } from "../Link/Link";

type ActiveLinkProps = Omit<LinkProps, "passHref"> & {
  children: ReactElement;
  className?: string;
  activeClassName: string;
  disableHref?: boolean;
};

export const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  className,
  activeClassName,
  disableHref,
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);

  const href =
    typeof props.href === "string" ? props.href : props.href.href ?? "";
  const isActive = `${asPath}/`.indexOf(href) !== -1;
  const linkClassName = classNames(className, { [activeClassName]: isActive });

  return disableHref ? (
    cloneElement(child, { className: linkClassName })
  ) : (
    <Link className={linkClassName} {...props}>
      {children}
    </Link>
  );
};
