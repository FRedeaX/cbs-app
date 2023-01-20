import Script from "next/script";

import { GTag } from "../../core/metrics/GTag/GTag";
import { YMetrika } from "../../core/metrics/YMetrika/YMetrika";
import scrollbarWidth from "../../public/scripts/scrollbarWidth";
import classes from "./Footer.module.css";

const Footer = () => (
  <div>
    <div className={classes.body}>
      <YMetrika />
      <GTag />
      <Script
        id="scrollbarWidth"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: scrollbarWidth(),
        }}
      />
      {/* <Litres /> */}
    </div>
  </div>
);

export default Footer;
