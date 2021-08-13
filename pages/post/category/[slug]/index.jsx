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

const Home = ({ menu, posts, pages, name }) => {
  const {
    isFallback,
    query: { slug },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback}>
      <SEO
        title={`Категория: ${name || ""}`}
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

//getServerSideProps
//getStaticProps
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

  const pages = await paginationLoad({
    key: `posts_c_${slug}`,
    query: POSTS_PAGINATION_BY_CATEGORY_GQL,
    endCursor: data.category.posts.pageInfo.endCursor,
    category: slug,
  }).then((pagesInfo) => pagesInfo[pagesInfo.length - 1].number);

  const name = data.category.posts.nodes[0].categories.nodes.filter(
    (node) => node.slug === slug
  )?.[0]?.name;

  return {
    props: {
      menu,
      pages,
      posts: data.category.posts.nodes,
      name,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
