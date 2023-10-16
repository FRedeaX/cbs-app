import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import {
  getMenu,
  getMetadata,
  getPosters,
  getPosts,
  getResources,
} from "@/core/ssr";
import { SSRError } from "@/core/ssr/utils/ssrEror";
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
  metadata: Awaited<ReturnType<typeof getMetadata>>;
  resources: Awaited<ReturnType<typeof getResources>>;
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

    if (params.page.endsWith(".css.map")) return staticNotFound;

    const page = parseInt(params.page, 10);
    if (Number.isNaN(page)) {
      throw new SSRError(`pageNumber ${ERROR_MESSAGE.IS_NOT_NUMBER}`, {
        params,
      });
    }

    const menuData = getMenu();
    const postsData = getPosts({ page });
    const postersData = getPosters.load().then(getPosters.filter);
    const metadataData = getMetadata();
    const resourcesData = getResources();

    const [menu, posts, posters, metadata, resources] = await Promise.all([
      menuData,
      postsData,
      postersData,
      metadataData,
      resourcesData,
    ]);

    return {
      props: {
        menu,
        posts,
        posters,
        metadata,
        resources,
      },
      revalidate: REVALIDATE.POST,
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
  posters,
  metadata,
  resources,
}) => {
  const {
    isFallback,
    query: { page },
  } = useRouter();

  return (
    <Layout menu={menu} pageLoading={isFallback}>
      <SEO
        domenTitle={metadata.title}
        title={`Страница ${page}`}
        description={`Мероприятия библиотек города Байконур, страница №${page}`}
      />
      <HomeLayout posters={posters} resources={resources}>
        <HomePage
          posts={posts.data}
          pagination={{ count: posts.pageCount, uri: "/post" }}
        />
      </HomeLayout>
    </Layout>
  );
};

export default Home;
