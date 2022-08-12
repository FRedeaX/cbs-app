import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";
import Head from "../../../../components/Head/Head";
import HomePage from "../../../../components/Pages/HomePage/HomePage";
import {
  fetchArticlesByCategory,
  POSTS_PAGINATION_BY_CATEGORY_GQL,
} from "../../../../components/Posts/PostsRoot";
import Layout from "../../../../components/UI/Layout/Layout";
import {
  getMenu,
  paginationLoad,
  plaiceholder,
} from "../../../../helpers/backend";
import { client } from "../../../../store/apollo-client";
import { RKEY_POSTS_BY_CATEGORY } from "../../../../store/redis/redisKeys";

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
      {
        params: {
          slug: "novosti",
        },
      },
    ],
    fallback: "blocking",
  };
}

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
      captureException({ ...err, cstMessage: "FETCH_ARTICLES" });
      return null;
    });

  if (postsByCategory === null) {
    return {
      notFound: true,
    };
  }

  const posts = await plaiceholder(postsByCategory.category.posts.nodes).catch(
    (err) => {
      captureException({ ...err, cstMessage: "fetchArticlesByCategory" });
      return null;
    },
  );

  const pages = await paginationLoad({
    key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
    query: POSTS_PAGINATION_BY_CATEGORY_GQL,
    endCursor: postsByCategory.category?.posts.pageInfo.endCursor,
    category: slug,
  })
    .then((pagesInfo) => pagesInfo[pagesInfo.length - 1].number - 1)
    .catch((err) => {
      captureException({ ...err, cstMessage: "POSTS_PAGINATION_BY_CATEGORY_GQL" });
      return null;
    });

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
