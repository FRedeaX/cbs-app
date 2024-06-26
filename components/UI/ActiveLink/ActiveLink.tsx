/* eslint-disable react/jsx-props-no-spreading */
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Children, FC, cloneElement, ReactElement } from "react";

import { Link, LinkProps } from "../Link/Link";

type ActiveLinkProps = Omit<LinkProps, "passHref"> & {
  children: ReactElement;
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
  const pathname = usePathname();

  const child = Children.only(children);

  const href =
    typeof props.href === "string" ? props.href : props.href.href ?? "";
  const isActive = `${pathname}/`.indexOf(href) !== -1;
  const linkClassName = classNames(className, { [activeClassName]: isActive });

  return disableHref ? (
    cloneElement(child, { className: linkClassName })
  ) : (
    <Link className={linkClassName} {...props}>
      {children}
    </Link>
  );
};
