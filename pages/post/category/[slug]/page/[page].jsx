import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";
import Head from "../../../../../components/Head/Head";
import HomePage from "../../../../../components/Pages/HomePage/HomePage";
import {
  fetchArticlesByCategory,
  POSTS_PAGINATION_BY_CATEGORY_GQL,
} from "../../../../../components/Posts/PostsRoot";
import Layout from "../../../../../components/UI/Layout/Layout";
import {
  getMenu,
  paginationLoad,
  plaiceholder,
} from "../../../../../helpers/backend";
import { client } from "../../../../../store/apollo-client";
import { RKEY_POSTS_BY_CATEGORY } from "../../../../../store/redis/redisKeys";

const Home = ({ menu, posts, pages, categoryName }) => {
  const {
    isFallback,
    query: { slug, page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={0}>
      <Head
        title={`Категория: ${categoryName} — cтраница ${page}`}
        description={`Мероприятия библиотек города Байконур по категории ${categoryName}, cтраница ${page}`}
      />
      <HomePage
        posts={posts}
        pages={pages}
        paginationURI={`/post/category/${slug}`}
        categoryName={categoryName}
        isGroupCards={false}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: "novosti",
          page: "2",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug, page } }) {
  const menu = await getMenu();
  const pagesInfo = await paginationLoad({
    key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
    query: POSTS_PAGINATION_BY_CATEGORY_GQL,
    category: slug,
  });

  const { cursor } = pagesInfo[page - 1 || 0];
  const { posts, categoryName } = await client
    .query({
      query: fetchArticlesByCategory,
      variables: {
        id: slug,
        first: cursor === "" ? 10 : 20,
        cursor,
      },
      fetchPolicy: "network-only",
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
            (node) => node.slug === slug,
          )?.[0]?.name || null,
      };
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "fetchArticlesByCategory" });
      return { posts: null, categoryName: null };
    });

  if (posts === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
      pages: pagesInfo[pagesInfo.length - 1].number - 1,
      posts,
      categoryName,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
