import classNames from "classnames";
import React, { Fragment, memo } from "react";
import classes from "./Title.module.css";

export const SUBTITLE = "SUBTITLE";

const Title = ({ type, HtmlTeg, children, cls }) => (
  <Fragment>
    {type === SUBTITLE ? (
      <HtmlTeg className={classNames(classes.subtitle, cls)}>
        {children}
      </HtmlTeg>
    ) : (
      <HtmlTeg className={classNames(classes.title, cls)}>{children}</HtmlTeg>
    )}
  </Fragment>
);

export default memo(Title);
