import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import { ReactChild, useCallback } from "react";
import classes from "./Carusel2.module.css";
import useCarusel2 from "./useCarusel2";

interface Carusel2Props {
  children: ReactChild;
  isScrollSnap: boolean;
}

export default function Carusel2({ children, isScrollSnap }: Carusel2Props) {
  const [ref, { hendleScroll }] = useCarusel2();

  const onClickLeftHendler = useCallback(() => {
    hendleScroll("prev");
  }, []);
  const onClickRightHendler = useCallback(() => {
    hendleScroll("next");
  }, []);

  return (
    <div className={classes.root}>
      <div
        ref={ref}
        className={classNames(classes.scrolled, {
          [classes.scrolled_scrollSnap]: isScrollSnap,
        })}>
        <div className={classes.itemList}>{children}</div>
      </div>

      <IconButton>
        <ArrowForwardIosRoundedIcon sx={{ width: "44px", height: "44px" }} />
      </IconButton>
    </div>
  );
}
