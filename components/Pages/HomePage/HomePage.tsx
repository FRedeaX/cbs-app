// import { useQuery } from "@apollo/client";
import classnames from "classnames";
import type { NextPage } from "next";
import Link from "next/link";
import { memo } from "react";
import PosterRoot, { IPosters } from "../../poster/PosterRoot/PosterRoot";
import SectionHeader from "../../SectionHeader/SectionHeader";
// import { GET_WIDTH } from "../../../store/variables/windowWidth";
import CardList from "../../Widget/Card/CardList";
import Alert from "./../../Alert/Alert";
import classes from "./Home-Page.module.css";
import Pagination from "./Pagination/Pagination";

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
}) => (
  // const { data } = useQuery(GET_WIDTH);

  // const [isTowColumn, setTowColumn] = useState(data?.windowWidth >= 1300);

  // useEffect(() => {
  //   if (data.windowWidth >= 1300 && !isTowColumn) {
  //     setTowColumn(true);
  //   } else if (data.windowWidth < 1300 && isTowColumn) {
  //     setTowColumn(false);
  //   }
  // }, [isTowColumn, data?.windowWidth]);

  // console.log({ posters, posts, pages });

  /* <Today className={classes.today} /> */
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
    <Alert>
      <Link href="/biblioteki?schedule=default&holiday=true">
        <a className={classes["alert-link"]}>
          Изменение графика работ с 1 по 10 мая.
        </a>
      </Link>
    </Alert>
  </div>
);
export default memo(HomePage);
