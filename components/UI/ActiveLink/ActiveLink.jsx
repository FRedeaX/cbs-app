import Link from "next/link";
import { useRouter } from "next/router";
import { Children, cloneElement } from "react";

const ActiveLink = ({ children, activeClassName, isLink = true, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    `${asPath}/`.indexOf(props.href) !== -1
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return isLink ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...props}>{cloneElement(child, { className })}</Link>
  ) : (
    cloneElement(child, { className })
  );
};

export default ActiveLink;
