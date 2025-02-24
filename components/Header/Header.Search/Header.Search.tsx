import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { SEARCH_PATHNAME } from "@/constants";

import classes from "./Header.Search.module.css";

export const HeaderSearch: FC = () => {
  const pathname = usePathname();

  if (pathname === SEARCH_PATHNAME) return null;
  return (
    <Link href="/search" prefetch={false} passHref legacyBehavior>
      <IconButton className={classes.button} aria-label="Найти">
        <SearchRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Link>
  );
};
