// import HomePage from "~/components/Pages/HomePage/HomePage";
import { useRouter } from "next/router";

import HomePage from "../../../components/Pages/HomePage/HomePage";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "../../../components/Posts/PostsRoot";
import SEO from "../../../components/SEO/SEO";
import Layout from "../../../components/UI/Layout/Layout";
import { FETCH_POSTER } from "../../../components/poster/PosterRoot/PosterRoot";
import {
  getMenu,
  paginationLoad,
  plaiceholder,
  removeDuplicateTag,
} from "../../../helpers/backend";
import { dateConversion, filter, sort } from "../../../helpers/backend/poster";
import { client } from "../../../store/apollo-client";

const Home = ({ menu, posts, pages, posters }) => {
  const {
    isFallback,
    query: { page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={0}>
      <SEO
        title={`Страница ${page}`}
        description={`Мероприятия библиотек города Байконур страница №${page}`}
      />
      <HomePage
        posts={posts}
        pages={pages}
        paginationURI="/post"
        posters={posters}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          page: "2",
        },
      },
    ],
    fallback: true,
  };
}

// getServerSideProps
// getStaticProps
export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const page = params.page - 1;
  const pagesInfo = await paginationLoad({
    key: "posts",
    query: POSTS_PAGINATION_GQL,
  });
  const { cursor, tags } = pagesInfo[page];

  const posts = await client
    .query({
      query: FETCH_ARTICLES,
      variables: {
        first: cursor === "" ? 10 : 20,
        cursor,
        tagNotIn: tags,
      },
      fetchPolicy: "network-only",
    })
    .then(({ data }) =>
      removeDuplicateTag(data.posts.nodes).then((removeDuplicateRes) =>
        plaiceholder(removeDuplicateRes.result).then((p) => p),
      ),
    );

  const posters = await client
    .query({
      query: FETCH_POSTER,
    })
    .then(({ data }) =>
      dateConversion(data.posters.nodes).then((dateRes) =>
        sort(dateRes).then((sortRes) =>
          filter(sortRes).then((filterRes) => filterRes),
        ),
      ),
    );

  return {
    props: {
      menu,
      posters,
      pages: pagesInfo[pagesInfo.length - 1].number - 1,
      posts,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
