// import HomePage from "~/components/Pages/HomePage/HomePage";
import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { client } from "@/lib/apollo/client";
import { RKEY_POSTS } from "@/lib/redis";
import { getMenu, pagination } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import {
  plaiceholder,
  removeDuplicateTag,
  staticNotFound,
} from "@/helpers/backend";
import { dateConversion, filter, sort } from "@/helpers/backend/poster";
import Head from "@/components/Head/Head";
import HomePage, { IHomePageProps } from "@/components/Pages/HomePage/HomePage";
import { FETCH_ARTICLES } from "@/components/Posts/PostsRoot";
import Layout from "@/components/UI/Layout/Layout";
import { FETCH_POSTER } from "@/components/poster/gql/posterGQL";

import { getPageInfoPosts } from "../..";

export const getStaticPaths = () => ({
  paths: [{ params: { page: "2" } }],
  fallback: "blocking",
});

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
  posters: any;
} & Pick<IHomePageProps, "posts">;

interface Params extends ParsedUrlQuery {
  page: string;
}

type PaginationData = pagination.gql.PostsPaginationGQL;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (typeof params?.page !== "string")
      throw new Error("params page is not string");
    const pageNumber = parseInt(params.page, 10);
    if (Number.isNaN(pageNumber)) throw new Error("pageNumber is NaN");

    const menu = await getMenu();
    const paginationList = await pagination.load<PaginationData>({
      key: RKEY_POSTS,
      query: pagination.gql.POSTS_PAGINATION_GQL,
      isTags: true,
      pageInfoCallback: getPageInfoPosts,
    });

    const carrentPage = paginationList[pageNumber - 1];
    if (carrentPage === undefined) throw new Error("carrentPage of undefined");

    const { cursor, tags } = carrentPage;
    const posts = await client
      .query({
        query: FETCH_ARTICLES,
        variables: {
          first: cursor === "" ? 10 : 20,
          cursor,
          tagNotIn: tags,
        },
        fetchPolicy: "network-only",
      })
      .then(async ({ data, errors }) => {
        if (errors !== undefined) throw errors;
        if (data.posts.nodes.length === 0)
          throw new Error("data.posts.nodes of null");

        const removeDuplicateRes = await removeDuplicateTag(data.posts.nodes);
        const plaiceholderRes = await plaiceholder(removeDuplicateRes.result);
        return plaiceholderRes;
      })
      .catch((error) => {
        throw error;
      });

    const posters = await client
      .query({
        query: FETCH_POSTER,
      })
      .then(async ({ data, errors }) => {
        if (errors !== undefined) throw errors;
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
        lastPageNumber: pagination.getLastPageNumber(paginationList),
        posts,
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
  posts,
  lastPageNumber,
  posters,
}) => {
  const {
    isFallback,
    query: { page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={false}>
      <Head
        title={`Страница ${page}`}
        description={`Мероприятия библиотек города Байконур страница №${page}`}
      />
      <HomePage
        posts={posts}
        pages={lastPageNumber}
        paginationURI="/post"
        posters={posters}
      />
    </Layout>
  );
};

export default Home;
