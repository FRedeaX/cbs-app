import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { getMenu, getPosters, getPosts } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { HomeLayout, HomePage } from "@/routes/Home";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

export const getStaticPaths = () => ({
  paths: [{ params: { page: "2" } }],
  fallback: "blocking",
});

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  posts: Awaited<ReturnType<typeof getPosts>>;
  posters: Awaited<ReturnType<typeof getPosters.load>>;
};
interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (params === undefined) {
      throw new Error(ERROR_MESSAGE.PAGE_PARAMS_UNDEFINED);
    }

    const page = parseInt(params.page, 10);
    if (Number.isNaN(page)) {
      throw new Error(`pageNumber ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
    }

    const menuData = getMenu();
    const postsData = getPosts({ page });
    const postersData = getPosters.load().then(getPosters.filter);

    const [menu, posts, posters] = await Promise.all([
      menuData,
      postsData,
      postersData,
    ]);

    return {
      props: {
        menu,
        posts,
        posters,
      },
      revalidate: REVALIDATE.POST,
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({ menu, posts, posters }) => {
  const {
    isFallback,
    query: { page },
  } = useRouter();

  return (
    <Layout menu={menu} pageLoading={isFallback}>
      <SEO
        title={`Страница ${page}`}
        description={`Мероприятия библиотек города Байконур, страница №${page}`}
      />
      <HomeLayout posters={posters}>
        <HomePage
          posts={posts.data}
          pagination={{ count: posts.pageCount, uri: "/post" }}
        />
      </HomeLayout>
    </Layout>
  );
};

export default Home;
