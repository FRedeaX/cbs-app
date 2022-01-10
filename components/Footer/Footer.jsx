import React from "react";

import classes from "./Footer.module.css";
import YMetrika from "./YMetrika/YMetrika";

function Footer() {
  return (
    <div>
      <div className={classes.body}>
        <YMetrika />
        {/* <Litres /> */}
      </div>
    </div>
  );
}

export default Footer;
