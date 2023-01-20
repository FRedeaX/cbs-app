import type { GetStaticProps, NextPage } from "next";

import Head from "../components/Head/Head";
import HomePage, {
  IHomePageProps,
  IPostData,
} from "../components/Pages/HomePage/HomePage";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "../components/Posts/PostsRoot";
import Layout from "../components/UI/Layout/Layout";
import { FETCH_POSTER } from "../components/poster/PosterRoot/PosterRoot";
import { getLastPageNumber, paginationLoad } from "../core/pagination";
import { exceptionLog } from "../helpers";
import {
  _pageInfo,
  getMenu,
  plaiceholder,
  removeDuplicateTag,
} from "../helpers/backend";
import { dateConversion, filter, sort } from "../helpers/backend/poster";
import { RKEY_POSTS } from "../lib/redis/redisKeys";
import { client } from "../store/apollo-client";

type HomePageProps = Omit<
  IHomePageProps,
  "paginationURI" | "categoryName" | "isGroupCards"
>;

interface IHomeProps extends HomePageProps {
  menu: Array<object>;
}

const Home: NextPage<IHomeProps> = ({ menu, posters, posts, pages }) => (
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

export const getPageInfoPosts = (data: IPostData): _pageInfo =>
  data.posts.pageInfo;

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
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
    .catch((error) => {
      exceptionLog(error);
      return null;
    });

  if (dataPosts === null) {
    return {
      notFound: true,
    };
  }

  const posts = await removeDuplicateTag(dataPosts?.posts.nodes)
    .then((nodes) => plaiceholder(nodes.result).then((p) => p))
    .catch((error) => {
      exceptionLog(error);
      return null;
    });

  const pages = await paginationLoad<IPostData>({
    key: RKEY_POSTS,
    query: POSTS_PAGINATION_GQL,
    endCursor: dataPosts?.posts.pageInfo.endCursor,
    isTags: true,
    pageInfoCallback: getPageInfoPosts,
  }).then(getLastPageNumber);

  const posters = await client
    .query({
      query: FETCH_POSTER,
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw error;
      if (data.posters.nodes.length === 0)
        throw new Error("data.posters.nodes of null");

      const dateRes = await dateConversion(data.posters.nodes);
      const sortRes = await sort(dateRes);
      const filterRes = await filter(sortRes);
      return filterRes;
    })
    .catch((error) => {
      exceptionLog(error);
      return null;
    });

  return {
    props: {
      menu,
      posters,
      posts,
      pages,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE || "60", 10),
  };
};

export default Home;
