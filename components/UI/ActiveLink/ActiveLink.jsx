import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { Children } from "react";

const ActiveLink = ({ children, activeClassName, isLink = true, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    `${asPath}/`.indexOf(props.href) !== -1
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return isLink ? (
    <Link {...props}>{React.cloneElement(child, { className })}</Link>
  ) : (
    React.cloneElement(child, { className })
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};

export default ActiveLink;
