import Link from "next/link";
import { memo } from "react";

import logo from "../../public/logos/new-emblem-cbs-3-250x250.png";
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACb0lEQVQokTWSz04TcRSFJxpdu+INSFzzACa+gSuWrNQ10Y0mIILin8QQEVmYqi2hUCiUIi0ldWzBsQ2TqW2gYktahpIaFKwIgzAy087vM1Phbs7mnpt7v3MlSZKkwLh13tULl7kYzHB9qYiSqXCs6tjVPfKaTtdNLy1uT7FYPOeqFAjYTdOTGG2qzlp265Bw7gS/Cv5l0DbrVH8bZDapjS7T7vYahvHfPCTTlq1gyl+P6Y9hD8g0XiYRQ0nEo3mcvgj2VLZOrmoSztAhna2XLrOWKBzTE8F6nYJQFiYyiHEVEcohfBp0x6iHcg20TU6652iVoivcyFUPeTiP/UwGXxrxNo0IJHVGZ8bwJf6KGRkRjFp0z2Ir5SPeFxiTVJ1PiYLFnVkaARUyuiM+FGBBK7Gavce3QIT9W17yns+iZw6CGcTKFraULmMGNOiZQ2xv6wK+Yxz8IFXY5Od2EsfQwOMhnqiLXhnc28s7ICklbJfg/TBiVfELzC/g1MCqsVV6zvpuLwfKMFpcEf0yYlCG0g6OpGyQD2p17kZwxiY/CkOfFFYtwW7ejzJ9idnoVWYicbzhouiLgEdBZCsgxfJ0lXcNemPYT9+BEhoUqal+JnxjBOJVfAq8UhAvlmhyUMomqRKL0rVhWgyTWrpcp3OaumeuxkTiQHhVxEgGMZVFeBS4PY0T1HD+nFjuoCvNLKc02o9Nk2ShwYMFbO8yjKQhqCFc0r1RGhMazt7eHqrO46ZpfX29+T7RHB37Jie5ylEzy+FFxIAMb1KIXMXEtCzUjVPTWZ39Xuc4rXKBcVWnvvULSrs4LgilxKI/fbreaf0D4ClHlX5Ll2cAAAAASUVORK5CYII="
      />
    </a>
  </Link>
);

export default memo(Logo);
