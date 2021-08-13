import classnames from "classnames";
import Link from "next/link";
import { memo } from "react";
import classes from "./Logo.module.css";

const Logo = () => (
  <Link href="/">
    <a className={classes.logo}>
      <img
        width="80"
        height="80"
        className={classnames([classes.img, "skip"])}
        src={"/logos/new-emblem-cbs-3-250x250.png"}
        alt="Эмблема ГКУ ЦБС"
        // srcSet={`${window.location.origin}${process.env.PUBLIC_URL}/new-emblem-cbs-3-250x250.webp`}
      />
    </a>
  </Link>
);

export default memo(Logo);
