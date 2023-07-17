import Link from "next/link";
import { memo } from "react";

import logo from "@/public/logos/new-emblem-cbs-3-250x250.png";

import { Image } from "../Image/Image";

import classes from "./Logo.module.css";

const Logo = () => (
  <Link href="/" prefetch={false}>
    <a className={classes.root} aria-label="Перейти на главную страницу">
      <Image
        alt="Эмблема ГКУ ЦБС"
        src={logo}
        width={80}
        height={80}
        className={classes.image}
        classNamePlaceholder={classes.placeholder}
        priority
      />
    </a>
  </Link>
);

export default memo(Logo);
