import Script from "next/script";

import scrollbarWidth from "../../public/scripts/scrollbarWidth";
import classes from "./Footer.module.css";
import YMetrika from "./YMetrika/YMetrika";

const Footer = () => (
  <div>
    <div className={classes.body}>
      <YMetrika />
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
