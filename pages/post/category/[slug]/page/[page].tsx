import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import {
  getMenu,
  getMetadata,
  getPosters,
  getPostsByCategory,
  getResources,
} from "@/core/ssr";
import { SSRError } from "@/core/ssr/utils/ssrEror";
import { staticNotFound } from "@/helpers/backend";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";
import { HomeLayout } from "src/widgets/home/Layout";
import { HomePost } from "src/widgets/home/Post";

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
  metadata: Awaited<ReturnType<typeof getMetadata>>;
  resources: Awaited<ReturnType<typeof getResources>>;
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
    const metadataData = getMetadata();
    const resourcesData = getResources();

    const [menu, posts, posters, metadata, resources] = await Promise.all([
      menuData,
      postsData,
      postersData,
      metadataData,
      resourcesData,
    ]);

    const name = posts.data?.[0].categories.nodes.find(
      (node) => node.slug === slug,
    )?.name;
    if (name === undefined) {
      throw new SSRError(ERROR_MESSAGE.DATA_OF_NULL, { slug, page });
    }

    return {
      props: {
        menu,
        name,
        posts,
        posters,
        metadata,
        resources,
      },
      revalidate: REVALIDATE.POST,
    };
  } catch (error) {
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({
  menu,
  name,
  posts,
  posters,
  metadata,
  resources,
}) => {
  const {
    isFallback,
    query: { slug, page },
  } = useRouter();
  return (
    <Layout menu={menu} pageLoading={isFallback}>
      <SEO
        domenTitle={metadata.title}
        title={`Категория: ${name} — cтраница ${page}`}
        description={`Мероприятия библиотек города Байконур по категории ${name}, cтраница ${page}`}
      />
      <HomeLayout posters={posters} resources={resources}>
        <HomePost
          title={`Категория: ${name}`}
          posts={posts.data}
          pagination={{
            count: posts.pageCount,
            uri: `/post/category/${slug}`,
          }}
        />
      </HomeLayout>
    </Layout>
  );
};

export default Home;
