import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { getMenu, getPosters, getPostsByCategory } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { HomeLayout, HomePage } from "@/routes/Home";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "meropriyatie" } },
      { params: { slug: "vyistavka" } },
      { params: { slug: "novosti" } },
      { params: { slug: "tsgb" } },
      { params: { slug: "tsgdb" } },
      { params: { slug: "filial-1" } },
      { params: { slug: "filial-5" } },
      { params: { slug: "ooefkitl" } },
      { params: { slug: "ibo" } },
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

    const menuData = getMenu();
    const postsData = getPostsByCategory({ slug });
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
        name,
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

const Home: NextPage<HomeProps> = ({ menu, name, posters, posts }) => {
  const {
    isFallback,
    query: { slug },
  } = useRouter();
  return (
    <Layout menu={menu} pageLoading={isFallback}>
      <SEO
        title={`Категория: ${name}`}
        description={`Мероприятия библиотек города Байконур по категории ${name}`}
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
