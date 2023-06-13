// import { useQuery } from "@apollo/client";
import classnames from "classnames";

import classes from "./Home-Page.module.css";

import { PageInfo } from "../../../helpers/backend";
import { Nullable } from "../../../helpers/typings/utility-types";
import SectionHeader from "../../SectionHeader/SectionHeader";
import Pagination from "../../UI/Pagination/Pagination";
import { Card, IData } from "../../Widget/Card/Card";
import CardList from "../../Widget/Card/CardList";
import { IPoster } from "../../poster/PosterItem/PosterItem";
import PosterRoot from "../../poster/PosterRoot/PosterRoot";

import type { NextPage } from "next";

export interface IPostData {
  posts: {
    nodes: IData[];
    pageInfo: PageInfo;
  };
}

export interface IHomePageProps {
  posters?: Nullable<IPoster[]>;
  posts: IPostData["posts"]["nodes"];
  pages: number;
  paginationURI: string;
  categoryName?: string;
  isGroupCards?: boolean;
  /**
   * @default false
   */
  isSticky?: boolean;
}

const HomePage: NextPage<IHomePageProps> = ({
  posters,
  posts,
  pages,
  paginationURI,
  categoryName,
  isGroupCards = true,
  isSticky = false,
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
    <div>
      <section className={classnames(classes.section, classes.questionnaire)}>
        {isSticky && (
          <Card
            isHorizontal
            data={{
              title: "Анкета пользователя Библиотеки Модельного стандарта",
              excerpt:
                "Просим ответить на вопросы — это не займет у Вас много времени.",
              uri: "/questionnaire",
              featuredImage: {
                node: {
                  sourceUrl:
                    "https://cbsbaikonur.ru/wp-content/uploads/2022/10/logo-cbs@720.jpg",
                },
              },
            }}
          />
        )}
      </section>
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
    </div>
    {/* <Alert>
      <Link href="/biblioteki?schedule=default&holiday=true">
        <a className={classes["alert-link"]}>
          Изменение графика работ с 1 по 10 мая.
        </a>
      </Link>
    </Alert> */}
  </div>
);
export default HomePage;
