import { useQuery } from "@apollo/client";
import classnames from "classnames";
import { memo, useEffect, useState } from "react";
import PosterRoot from "~/components/poster/PosterRoot/PosterRoot";
import { PostsRoot } from "~/components/Posts/PostsRoot";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { GET_WIDTH } from "~/store/variables/windowWidth";
import classes from "./Home-Page.module.css";
import Pagination from "./Pagination/Pagination";

const HomePage = ({
  posters,
  posts,
  pages,
  paginationURI,
  categoryName,
  isGroupCards = true,
}) => {
  const { data } = useQuery(GET_WIDTH);

  const [isTowColumn, setTowColumn] = useState(data?.windowWidth >= 1300);

  useEffect(() => {
    if (data.windowWidth >= 1300 && !isTowColumn) {
      setTowColumn(true);
    } else if (data.windowWidth < 1300 && isTowColumn) {
      setTowColumn(false);
    }
  }, [isTowColumn, data?.windowWidth]);

  // console.log({ posters, posts, pages });

  {
    /* <Today className={classes.today} /> */
  }
  return (
    <div className={classes.wrapper}>
      {posters && (
        <aside className={classnames(classes.section, classes.poster)}>
          <SectionHeader url="/poster">Анонсы</SectionHeader>
          <PosterRoot
            posters={posters}
            className={{
              group: classes.group,
              // list: classes.list,
              item: classes.item,
              controls: classes.controls,
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
                : `Катигория: ${categoryName}`}
            </SectionHeader>
            <div className={classes.container}>
              <PostsRoot postNodes={posts} isGroupCards={isGroupCards} />
            </div>
          </>
        )}
        {pages && <Pagination pages={pages} paginationURI={paginationURI} />}
      </section>
    </div>
    /* <Alert>
      <Link
        to={"/biblioteki/?lib=cgb&schedule=1"}
        className={classes["alert-link"]}
      >
        Изменение графика работ в период новогодних праздничных дней.
      </Link>
    </Alert> */
  );
};

export default memo(HomePage);
