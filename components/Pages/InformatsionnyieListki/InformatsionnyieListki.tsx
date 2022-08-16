import { FC } from "react";

import { _pageInfo } from "../../../helpers/backend";
import Pagination from "../../UI/Pagination/Pagination";
import { IData } from "../../Widget/Card/Card";
import СardListUngrouped from "../../Widget/Card/СardListUngrouped/СardListUngrouped";
import { Heading } from "../../blocks/Heading/Heading";
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
      <Heading level={1}>{page.title}</Heading>
    </div>
    <div className={classes.container}>
      <СardListUngrouped nodes={page.children.nodes} isHorizontal />
    </div>
    <Pagination
      pages={pagination}
      paginationURI="/nashi-izdaniya/informatsionnyie-listki"
    />
  </>
);
