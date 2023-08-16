import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { getMenu, getPosters, getPostsByCategory } from "@/core/ssr";
import { staticNotFound } from "@/helpers/backend";
import { HomeLayout, HomePage } from "@/routes/Home";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return { paths: [], fallback: "blocking" };
  }

  return {
    paths: [
      { params: { slug: "meropriyatie", page: "2" } },
      { params: { slug: "vyistavka", page: "2" } },
      { params: { slug: "novosti", page: "2" } },
      { params: { slug: "tsgb", page: "2" } },
      { params: { slug: "tsgdb", page: "2" } },
      { params: { slug: "filial-1", page: "2" } },
      { params: { slug: "filial-5", page: "2" } },
      { params: { slug: "ooefkitl", page: "2" } },
      { params: { slug: "ibo", page: "2" } },
    ],
    fallback: "blocking",
  };
}

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  posts: Awaited<ReturnType<typeof getPostsByCategory>>;
  posters: Awaited<ReturnType<typeof getPosters.load>>;
  name: string;
};

interface Params extends ParsedUrlQuery {
  slug: string;
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

    const { slug } = params;
    const page = parseInt(params.page, 10);
    if (Number.isNaN(page)) {
      throw new Error(`pageNumber ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
    }

    const menuData = getMenu();
    const postsData = getPostsByCategory({ slug, page });
    const postersData = getPosters.load().then(getPosters.filter);

    const [menu, posts, posters] = await Promise.all([
      menuData,
      postsData,
      postersData,
    ]);

    const name = posts.data?.[0].categories.nodes.find(
      (node) => node.slug === slug,
    )?.name;
    if (name === undefined) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

    return {
      props: {
        menu,
        posts,
        posters,
        name,
      },
      revalidate: REVALIDATE.POST,
    };
  } catch (error) {
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({ menu, posts, posters, name }) => {
  const {
    isFallback,
    query: { slug, page },
  } = useRouter();
  return (
    <Layout menu={menu} pageLoading={isFallback}>
      <SEO
        title={`Категория: ${name} — cтраница ${page}`}
        description={`Мероприятия библиотек города Байконур по категории ${name}, cтраница ${page}`}
      />
      <HomeLayout posters={posters}>
        <HomePage
          posts={posts.data}
          pagination={{ count: posts.pageCount, uri: `/post/category/${slug}` }}
          categoryName={name}
        />
      </HomeLayout>
    </Layout>
  );
};

export default Home;
