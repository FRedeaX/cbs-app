import { useRouter } from "next/router";

import Head from "../../../../components/Head/Head";
import HomePage from "../../../../components/Pages/HomePage/HomePage";
import {
  POSTS_PAGINATION_BY_CATEGORY_GQL,
  fetchArticlesByCategory,
} from "../../../../components/Posts/PostsRoot";
import Layout from "../../../../components/UI/Layout/Layout";
import { getLastPageNumber, paginationLoad } from "../../../../core/pagination";
import { exceptionLog } from "../../../../helpers";
import { getMenu, plaiceholder } from "../../../../helpers/backend";
import { RKEY_POSTS_BY_CATEGORY } from "../../../../lib/redis";
import { client } from "../../../../store/apollo-client";

const Home = ({ menu, posts, pages, name }) => {
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
        pages={pages}
        paginationURI={`/post/category/${slug}`}
        categoryName={name}
        isGroupCards={false}
      />
    </Layout>
  );
};

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

export const getPageInfoCategory = (data) => data.category.posts.pageInfo;

export async function getStaticProps({ params: { slug } }) {
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
    .catch((err) => {
      exceptionLog({ ...err, cstMessage: "FETCH_ARTICLES" });
      return null;
    });

  if (postsByCategory === null) {
    return {
      notFound: true,
    };
  }

  const posts = await plaiceholder(postsByCategory.category.posts.nodes).catch(
    (err) => {
      exceptionLog(err);
      return null;
    },
  );

  const pages = await paginationLoad({
    key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
    query: POSTS_PAGINATION_BY_CATEGORY_GQL,
    endCursor: postsByCategory.category?.posts.pageInfo.endCursor,
    id: slug,
    pageInfoCallback: getPageInfoCategory,
  }).then(getLastPageNumber);

  const name = postsByCategory.category.posts.nodes[0].categories.nodes.filter(
    (node) => node.slug === slug,
  )?.[0]?.name;

  return {
    props: {
      menu,
      pages,
      posts,
      name,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
