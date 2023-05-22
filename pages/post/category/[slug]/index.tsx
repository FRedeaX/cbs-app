import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Head from "../../../../components/Head/Head";
import HomePage from "../../../../components/Pages/HomePage/HomePage";
import { fetchArticlesByCategory } from "../../../../components/Posts/PostsRoot";
import Layout from "../../../../components/UI/Layout/Layout";
import { getMenu, pagination } from "../../../../core/backend";
import { exceptionLog } from "../../../../helpers";
import { plaiceholder, staticNotFound } from "../../../../helpers/backend";
import { client } from "../../../../lib/apollo/client";
import { RKEY_POSTS_BY_CATEGORY } from "../../../../lib/redis";

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
  posts: any;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

type PaginationData = pagination.gql.PostsPaginationByCategoryGQL;

export const getPageInfoCategory = (data: PaginationData) =>
  data.category.posts.pageInfo;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (typeof params?.page !== "string")
      throw new Error("params page is not string");
    const { slug } = params;

    const menu = await getMenu();
    const postsByCategory = await client
      .query({
        query: fetchArticlesByCategory,
        variables: {
          id: slug,
          first: 10,
          cursor: "",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data, error }) => {
        if (error !== undefined) throw new Error(error.message);
        if (data.category?.posts.nodes.length === 0)
          throw new Error("data.category.posts.nodes of null");

        return data;
      })
      .catch((error) => {
        throw error;
      });

    const posts = await plaiceholder(
      postsByCategory.category.posts.nodes,
    ).catch((error) => {
      exceptionLog(error);
      return null;
    });

    const lastPageNumber = await pagination
      .load<PaginationData>({
        key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
        query: pagination.gql.POSTS_PAGINATION_BY_CATEGORY_GQL,
        endCursor: postsByCategory.category?.posts.pageInfo.endCursor,
        id: slug,
        pageInfoCallback: getPageInfoCategory,
      })
      .then(pagination.getLastPageNumber);

    const name =
      postsByCategory.category.posts.nodes[0].categories.nodes.filter(
        (node: any) => node.slug === slug,
      )?.[0]?.name;

    return {
      props: {
        menu,
        name,
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

const Home: NextPage<HomeProps> = ({ menu, posts, lastPageNumber, name }) => {
  const {
    isFallback,
    query: { slug },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback}>
      <Head
        title={`Категория: ${name}`}
        description={`Мероприятия библиотек города Байконур по категории ${name}`}
      />
      <HomePage
        posts={posts}
        pages={lastPageNumber}
        paginationURI={`/post/category/${slug}`}
        categoryName={name}
        isGroupCards={false}
      />
    </Layout>
  );
};

export default Home;
