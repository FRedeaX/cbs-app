import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { client } from "@/lib/apollo/client";
import { RKEY_POSTS_BY_CATEGORY } from "@/lib/redis";
import { getMenu, pagination } from "@/core/backend";
import { plaiceholder, staticNotFound } from "@/helpers/backend";
import Head from "@/components/Head/Head";
import HomePage from "@/components/Pages/HomePage/HomePage";
import { fetchArticlesByCategory } from "@/components/Posts/PostsRoot";
import Layout from "@/components/UI/Layout/Layout";

import { getPageInfoCategory } from "..";

export async function getStaticPaths() {
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
  posts: any;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
  categoryName: string;
};

interface Params extends ParsedUrlQuery {
  page: string;
}

type PaginationData = pagination.gql.PostsPaginationByCategoryGQL;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (typeof params?.page !== "string") {
      throw new Error("params page is not string");
    }

    const { slug } = params;
    if (typeof slug !== "string") {
      throw new Error("slug is string");
    }

    const pageNumber = parseInt(params.page, 10);
    if (Number.isNaN(pageNumber)) {
      throw new Error("pageNumber is NaN");
    }

    const menu = await getMenu();
    const paginationList = await pagination.load<PaginationData>({
      key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
      query: pagination.gql.POSTS_PAGINATION_BY_CATEGORY_GQL,
      id: slug,
      pageInfoCallback: getPageInfoCategory,
    });

    const carrentPage = paginationList[pageNumber - 1];
    if (carrentPage === undefined) throw new Error("carrentPage of undefined");

    const { cursor } = carrentPage;
    const { posts, categoryName } = await client
      .query({
        query: fetchArticlesByCategory,
        variables: {
          id: slug,
          first: cursor === "" ? 10 : 20,
          cursor,
        },
      })
      .then(async ({ data, error }) => {
        if (error !== undefined) throw new Error(error.message);
        if (data.category?.posts.nodes.length === 0)
          throw new Error("data.category.posts.nodes of null");

        const plaiceholderRes = await plaiceholder(data.category.posts.nodes);
        return {
          posts: plaiceholderRes,
          categoryName:
            data.category.posts.nodes[0].categories.nodes.filter(
              (node: any) => node.slug === slug,
            )?.[0]?.name || null,
        };
      })
      .catch((error) => {
        throw error;
      });

    return {
      props: {
        menu,
        lastPageNumber: pagination.getLastPageNumber(paginationList),
        posts,
        categoryName,
      },
      revalidate: parseInt(process.env.POST_REVALIDATE ?? "60", 10),
    };
  } catch (error) {
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({
  menu,
  posts,
  lastPageNumber,
  categoryName,
}) => {
  const {
    isFallback,
    query: { slug, page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={false}>
      <Head
        title={`Категория: ${categoryName} — cтраница ${page}`}
        description={`Мероприятия библиотек города Байконур по категории ${categoryName}, cтраница ${page}`}
      />
      <HomePage
        posts={posts}
        pages={lastPageNumber}
        paginationURI={`/post/category/${slug}`}
        categoryName={categoryName}
        isGroupCards={false}
      />
    </Layout>
  );
};

export default Home;
