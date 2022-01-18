import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import classes from "./Logo.module.css";

const Logo = () => (
  <Link href="/">
    <a className={classes.logo} aria-label="Перейти на главную страницу.">
      <Image
        src="/logos/new-emblem-cbs-3-250x250.png"
        className={classNames(classes.img)}
        width={80}
        height={80}
        alt="Эмблема ГКУ ЦБС"
      />
    </a>
  </Link>
);

export default memo(Logo);
