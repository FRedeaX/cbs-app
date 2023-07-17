import classNames from "classnames";
import Script from "next/script";
import { FC } from "react";

import { YMetrika } from "@/core/metrics/YMetrika/YMetrika";
import { scrollbarWidth } from "@/helpers/frontend";

import classes from "./Footer.module.css";

type FooterProps = { className?: string };
export const Footer: FC<FooterProps> = ({ className }) => (
  <div className={classNames(classes.root, className)}>
    <YMetrika />
    <Script
      id="scrollbarWidth"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: String(scrollbarWidth()),
      }}
    />
    {/* <Litres /> */}
  </div>
);
