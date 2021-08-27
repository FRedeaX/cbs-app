import { useRouter } from "next/router";
import HomePage from "~/components/Pages/HomePage/HomePage";
import {
  fetchArticlesByCategory,
  POSTS_PAGINATION_BY_CATEGORY_GQL,
} from "~/components/Posts/PostsRoot";
import { SEO } from "~/components/SEO/SEO";
import { paginationLoad, getMenu } from "~/helpers/backend";
import { client } from "~/store/apollo-client";
import Layout from "~/components/UI/Layout/Layout";

const Home = ({ menu, posts, pages, categoryName }) => {
  const {
    isFallback,
    query: { slug, page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={0}>
      <SEO
        title={`Категория: ${categoryName || ""} — cтраница ${page}`}
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

//getServerSideProps
//getStaticProps
export async function getStaticProps({ params: { slug, page } }) {
  const menu = await getMenu();
  const pagesInfo = await paginationLoad({
    key: `posts_c_${slug}`,
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
    .then(({ data }) => ({
      posts: data.category.posts.nodes,
      categoryName: data.category.posts.nodes[0].categories.nodes.filter(
        (node) => node.slug === slug
      )?.[0]?.name,
    }));

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
