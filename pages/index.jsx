import { captureException } from "@sentry/nextjs";

import Head from "../components/Head/Head";
import HomePage from "../components/Pages/HomePage/HomePage";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "../components/Posts/PostsRoot";
import Layout from "../components/UI/Layout/Layout";
import { FETCH_POSTER } from "../components/poster/PosterRoot/PosterRoot";
import {
  getMenu,
  paginationLoad,
  plaiceholder,
  removeDuplicateTag,
} from "../helpers/backend";
import { dateConversion, filter, sort } from "../helpers/backend/poster";
import { client } from "../store/apollo-client";
import { RKEY_POSTS } from "../store/redis/redisKeys";

const Home = ({ menu, posters, posts, pages }) => (
  <Layout menu={menu} paddingSides={0}>
    <Head description="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур" />
    <HomePage
      posters={posters}
      posts={posts}
      pages={pages}
      paginationURI="/post"
    />
  </Layout>
);

export async function getStaticProps() {
  const menu = await getMenu(false);
  const dataPosts = await client
    .query({
      query: FETCH_ARTICLES,
      variables: {
        first: 10,
        cursor: "",
      },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => data);

  const posts = await removeDuplicateTag(dataPosts?.posts.nodes)
    .then((nodes) => plaiceholder(nodes.result).then((p) => p))
    .catch((err) => {
      captureException(err, "FETCH_ARTICLES");
      return null;
    });

  const pages = await paginationLoad({
    key: RKEY_POSTS,
    query: POSTS_PAGINATION_GQL,
    endCursor: dataPosts?.posts.pageInfo.endCursor,
  })
    .then((pagesInfo) => pagesInfo[pagesInfo.length - 1].number - 1)
    .catch((err) => {
      captureException(err, "POSTS_PAGINATION_GQL");
      return null;
    });

  const posters = await client
    .query({
      query: FETCH_POSTER,
      fetchPolicy: "network-only",
    })
    .then(({ data }) =>
      dateConversion(data.posters.nodes).then((dateRes) =>
        sort(dateRes).then((sortRes) =>
          filter(sortRes).then((filterRes) => filterRes),
        ),
      ),
    )
    .catch((err) => {
      captureException(err, "FETCH_POSTER");
      return null;
    });

  return {
    props: {
      menu,
      posters,
      posts,
      pages,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
