import { Typography } from "@mui/material";
import { FC } from "react";

import { _pageInfo } from "../../../helpers/backend";
import Pagination from "../../UI/Pagination/Pagination";
import { IData } from "../../Widget/Card/Card";
import CardListUngrouped from "../../Widget/Card/CardListUngrouped/CardListUngrouped";
import classes from "./InformatsionnyieListki.module.css";

export type InformatsionnyieListkiPage = {
  title: string;
  excerpt: string;
  children: {
    nodes: IData[];
    pageInfo: _pageInfo;
  };
};

interface IInformatsionnyieListki {
  page: InformatsionnyieListkiPage;
  pagination: number;
}

export const InformatsionnyieListki: FC<IInformatsionnyieListki> = ({
  page,
  pagination,
}) => (
  <>
    <div className={classes.header}>
      <Typography align="center" variant="h1">
        {page.title}
      </Typography>
    </div>
    <div className={classes.container}>
      <CardListUngrouped nodes={page.children.nodes} isHorizontal />
    </div>
    <Pagination
      pages={pagination}
      paginationURI="/nashi-izdaniya/informatsionnyie-listki"
    />
  </>
);
