import { useRouter } from "next/router";

import HomePage from "../../../../components/Pages/HomePage/HomePage";
import {
  POSTS_PAGINATION_BY_CATEGORY_GQL,
  fetchArticlesByCategory,
} from "../../../../components/Posts/PostsRoot";
import SEO from "../../../../components/SEO/SEO";
import Layout from "../../../../components/UI/Layout/Layout";
import {
  getMenu,
  paginationLoad,
  plaiceholder,
} from "../../../../helpers/backend";
import { client } from "../../../../store/apollo-client";

const Home = ({ menu, posts, pages, name }) => {
  const {
    isFallback,
    query: { slug },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback}>
      <SEO
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
  const { data } = await client.query({
    query: fetchArticlesByCategory,
    variables: {
      id: slug,
      first: 10,
      cursor: "",
    },
    fetchPolicy: "network-only",
  });

  const posts = await plaiceholder(data.category.posts.nodes).then((p) => p);

  const pages = await paginationLoad({
    key: `posts_c_${slug}`,
    query: POSTS_PAGINATION_BY_CATEGORY_GQL,
    endCursor: data.category.posts.pageInfo.endCursor,
    category: slug,
  }).then((pagesInfo) => pagesInfo[pagesInfo.length - 1].number - 1);

  const name = data.category.posts.nodes[0].categories.nodes.filter(
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
