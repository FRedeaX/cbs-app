import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { Children, FC, ReactElement, cloneElement } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  className?: string;
  activeClassName: string;
  /**
   * @default false
   */
  isLink?: boolean;
};

export const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  className,
  activeClassName,
  isLink = true,
  ...props
}) => {
  const { asPath } = useRouter();
  const href =
    typeof props.href === "string" ? props.href : props.href.href ?? "";
  const isActive = `${asPath}/`.indexOf(href) !== -1;
  const linkClassName = classNames(className, { [activeClassName]: isActive });

  return isLink ? (
    <Link
      className={linkClassName}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </Link>
  ) : (
    cloneElement(Children.only(children), { className: linkClassName })
  );
};
