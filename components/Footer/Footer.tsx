import classNames from "classnames";
import { FC } from "react";

import { YMetrika } from "@/core/metrics/YMetrika/YMetrika";

import classes from "./Footer.module.css";

type FooterProps = { className?: string };
export const Footer: FC<FooterProps> = ({ className }) => (
  <div className={classNames(classes.root, className)}>
    <YMetrika />
    {/* <Litres /> */}
  </div>
);
