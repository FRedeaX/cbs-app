import { FC, ReactNode } from "react";

import classes from "./CustomeScrollbar.module.css";

type CustomeScrollbarProps = {
  children: ReactNode;
};

export const CustomeScrollbar: FC<CustomeScrollbarProps> = ({ children }) => (
  <div className={classes.root}>{children}</div>
);
