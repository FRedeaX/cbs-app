import Image from "next/future/image";
import Link from "next/link";

import logo from "@/public/logos/new-emblem-cbs-3-250x250.png";

import classes from "./Logo.module.css";

export const Logo = () => (
  <Link href="/" prefetch={false}>
    <a className={classes.root} aria-label="Перейти на главную страницу">
      <Image
        alt="Эмблема ГКУ ЦБС"
        src={logo}
        width={75}
        height={75}
        className={classes.image}
        // classNamePlaceholder={classes.placeholder}
      />
    </a>
  </Link>
);
