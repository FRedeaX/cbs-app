import { captureException } from "@sentry/nextjs";
import type { GetStaticProps, NextPage } from "next";

import Head from "../components/Head/Head";
import HomePage from "../components/Pages/HomePage/HomePage";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "../components/Posts/PostsRoot";
import Layout from "../components/UI/Layout/Layout";
import { IPoster } from "../components/poster/PosterItem/PosterItem";
import { FETCH_POSTER } from "../components/poster/PosterRoot/PosterRoot";
import { paginationLoad } from "../core/pagination";
import {
  _pageInfo,
  getMenu,
  plaiceholder,
  removeDuplicateTag,
} from "../helpers/backend";
import { dateConversion, filter, sort } from "../helpers/backend/poster";
import { client } from "../store/apollo-client";
import { RKEY_POSTS } from "../store/redis/redisKeys";

interface IPostData {
  posts: {
    nodes: object[];
    pageInfo: _pageInfo;
  };
}
interface IProps {
  menu: Array<object>;
  posters: IPoster[];
  posts: IPostData["posts"]["nodes"];
  pages: number;
}

const Home: NextPage<IProps> = ({ menu, posters, posts, pages }) => (
  <Layout menu={menu} paddingSides={0}>
    <Head description="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур" />
    {/* {console.log(posters)} */}
    <HomePage
      posters={posters}
      posts={posts}
      pages={pages}
      paginationURI="/post"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps<IProps> = async () => {
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
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.posts.nodes.length === 0)
        throw new Error("data.posts.nodes of null");

      return data;
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "FETCH_ARTICLES" });
      return null;
    });

  if (dataPosts === null) {
    return {
      notFound: true,
    };
  }

  const posts = await removeDuplicateTag(dataPosts?.posts.nodes)
    .then((nodes) => plaiceholder(nodes.result).then((p) => p))
    .catch((err) => {
      captureException(err);
      return null;
    });

  const pages = await paginationLoad<IPostData>({
    key: RKEY_POSTS,
    query: POSTS_PAGINATION_GQL,
    endCursor: dataPosts?.posts.pageInfo.endCursor,
  });

  // await paginationLoad({
  //   key: RKEY_POSTS,
  //   query: POSTS_PAGINATION_GQL,
  //   endCursor: dataPosts?.posts.pageInfo.endCursor,
  // })
  //   .then((pagesInfo: any) => pagesInfo[pagesInfo.length - 1].number - 1)
  //   .catch((err: any) => {
  //     captureException(err);
  //     return null;
  //   });

  const posters = await client
    .query({
      query: FETCH_POSTER,
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.posters.nodes.length === 0)
        throw new Error("data.posters.nodes of null");

      const dateRes = await dateConversion(data.posters.nodes);
      const sortRes = await sort(dateRes);
      const filterRes = await filter(sortRes);
      return filterRes;
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "FETCH_POSTER" });
      return null;
    });

  return {
    props: {
      menu,
      posters,
      posts,
      pages: 1,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE || "60", 10),
  };
};

export default Home;
