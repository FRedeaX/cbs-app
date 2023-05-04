import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { SEARCH_PATHNAME } from "../../../constant";
import classes from "./Header.Search.module.css";

export const HeaderSearch: FC = () => {
  const { pathname } = useRouter();

  if (pathname === SEARCH_PATHNAME) return null;
  return (
    <Link href="/search" prefetch={false} passHref>
      <IconButton className={classes.button} aria-label="Найти">
        <SearchRoundedIcon fontSize="small" />
      </IconButton>
    </Link>
  );
};
