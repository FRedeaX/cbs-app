import classNames from "classnames";
import { FC, HTMLAttributes, ReactNode } from "react";

import classes from "./Figure.module.css";

type FigureProps = {
  children: ReactNode;
  className?: string | classNames.ArgumentArray;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

export const Figure: FC<FigureProps> = ({ children, className, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <figure className={classNames(classes.root, className)} {...props}>
    {children}
  </figure>
);
