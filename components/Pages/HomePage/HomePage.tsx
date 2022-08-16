// import { useQuery } from "@apollo/client";
import classnames from "classnames";
import type { NextPage } from "next";
import { memo } from "react";

import SectionHeader from "../../SectionHeader/SectionHeader";
import Pagination from "../../UI/Pagination/Pagination";
import CardList from "../../Widget/Card/CardList";
// import { GET_WIDTH } from "../../../store/variables/windowWidth";
import PosterRoot, { IPosters } from "../../poster/PosterRoot/PosterRoot";
import classes from "./Home-Page.module.css";

interface IHomePageProps {
  posters: IPosters;
  posts: Array<object>;
  pages: number;
  paginationURI: string;
  categoryName?: string;
  isGroupCards?: boolean;
}

const HomePage: NextPage<IHomePageProps> = ({
  posters,
  posts,
  pages,
  paginationURI,
  categoryName,
  isGroupCards = true,
}: IHomePageProps) => (
  <div className={classes.wrapper}>
    {posters && posters.length > 0 && (
      <aside className={classnames(classes.section, classes.poster)}>
        <SectionHeader url="/poster">Анонсы</SectionHeader>
        <PosterRoot
          posters={posters}
          className={{
            group: classes.group,
            // list: classes.list,
            item: classes.item,
          }}
        />
      </aside>
    )}
    <section className={classnames(classes.section, classes.post)}>
      {posts && posts[0] && (
        <>
          <SectionHeader>
            {categoryName === undefined
              ? "Мероприятия"
              : `Категория: ${categoryName}`}
          </SectionHeader>
          <div className={classes.container}>
            <CardList
              nodes={posts}
              isGroupCards={isGroupCards}
              isHorizontal={categoryName !== undefined}
            />
          </div>
        </>
      )}
      {pages && <Pagination pages={pages} paginationURI={paginationURI} />}
    </section>
    {/* <Alert>
      <Link href="/biblioteki?schedule=default&holiday=true">
        <a className={classes["alert-link"]}>
          Изменение графика работ с 1 по 10 мая.
        </a>
      </Link>
    </Alert> */}
  </div>
);
export default memo(HomePage);
