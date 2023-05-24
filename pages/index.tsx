import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { client } from "@/lib/apollo/client";
import { RKEY_POSTS } from "@/lib/redis/redisKeys";
import { getMenu, pagination } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import {
  PageInfo,
  plaiceholder,
  removeDuplicateTag,
  staticNotFound,
} from "@/helpers/backend";
import { dateConversion, filter, sort } from "@/helpers/backend/poster";
import Head from "@/components/Head/Head";
import HomePage, { IHomePageProps } from "@/components/Pages/HomePage/HomePage";
import { FETCH_ARTICLES } from "@/components/Posts/PostsRoot";
import Layout from "@/components/UI/Layout/Layout";
import { FETCH_POSTER } from "@/components/poster/PosterRoot/PosterRoot";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
  posters: any;
} & Pick<IHomePageProps, "posts">;

type PaginationData = pagination.gql.PostsPaginationGQL;

export const getPageInfoPosts = (data: PaginationData): PageInfo =>
  data.posts.pageInfo;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    const menu = await getMenu(false);
    const { data: dataPosts, errors } = await client.query({
      query: FETCH_ARTICLES,
      variables: {
        first: 10,
        cursor: "",
      },
      fetchPolicy: "network-only",
    });
    if (errors !== undefined) throw errors;
    if (dataPosts.posts.nodes.length === 0)
      throw new Error("data.posts.nodes of null");

    const posts = await removeDuplicateTag(dataPosts.posts.nodes)
      .then((nodes) => plaiceholder(nodes.result).then((p) => p))
      .catch((error) => {
        exceptionLog(error);
        return null;
      });

    const lastPageNumber = await pagination
      .load<PaginationData>({
        key: RKEY_POSTS,
        query: pagination.gql.POSTS_PAGINATION_GQL,
        endCursor: dataPosts.posts.pageInfo.endCursor,
        isTags: true,
        pageInfoCallback: getPageInfoPosts,
      })
      .then(pagination.getLastPageNumber);

    const posters = await client
      .query({
        query: FETCH_POSTER,
        fetchPolicy: "network-only",
      })
      .then(async ({ data, errors: errorPostersQuery }) => {
        if (errorPostersQuery !== undefined) throw errorPostersQuery;
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
        lastPageNumber,
      },
      revalidate: parseInt(process.env.POST_REVALIDATE ?? "60", 10),
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({
  menu,
  posters,
  posts,
  lastPageNumber,
}) => (
  <Layout menu={menu} paddingSides={false}>
    <Head description="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур" />
    <HomePage
      posters={posters}
      posts={posts}
      pages={lastPageNumber}
      paginationURI="/post"
    />
  </Layout>
);

export default Home;
