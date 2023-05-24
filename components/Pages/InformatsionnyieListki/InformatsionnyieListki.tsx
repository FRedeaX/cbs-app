import { Typography } from "@mui/material";
import { FC } from "react";

import Pagination from "../../UI/Pagination/Pagination";
import { IData } from "../../Widget/Card/Card";
import CardListUngrouped from "../../Widget/Card/CardListUngrouped/CardListUngrouped";
import classes from "./InformatsionnyieListki.module.css";

type InformatsionnyieListkiPage = {
  title: string;
  excerpt: string;
  children: {
    nodes: IData[];
  };
};

interface IInformatsionnyieListki {
  page: InformatsionnyieListkiPage;
  pageNumber?: number;
  pagination: number;
}

export const InformatsionnyieListki: FC<IInformatsionnyieListki> = ({
  page,
  pageNumber,
  pagination,
}) => (
  <>
    <div className={classes.header}>
      <Typography align="center" variant="h1" gutterBottom={!!pageNumber}>
        {page.title}
      </Typography>
      {pageNumber && (
        <Typography align="center" variant="overline">
          {pageNumber} страница
        </Typography>
      )}
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
