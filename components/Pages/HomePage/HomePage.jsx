// import { useQuery } from "@apollo/client";
import classnames from "classnames";
import { memo } from "react";

// import { GET_WIDTH } from "../../../store/variables/windowWidth";
import { PostsRoot } from "../../Posts/PostsRoot";
import SectionHeader from "../../SectionHeader/SectionHeader";
import PosterRoot from "../../poster/PosterRoot/PosterRoot";
import classes from "./Home-Page.module.css";
import Pagination from "./Pagination/Pagination";

const HomePage = ({
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
    {posters && posters[0] && (
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
              : `Категория: ${categoryName}`}
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
export default memo(HomePage);
