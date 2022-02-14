// import HomePage from "~/components/Pages/HomePage/HomePage";
import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";

import Head from "../../../components/Head/Head";
import HomePage from "../../../components/Pages/HomePage/HomePage";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "../../../components/Posts/PostsRoot";
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
import { RKEY_POSTS } from "../../../store/redis/redisKeys";

const Home = ({ menu, posts, pages, posters }) => {
  const {
    isFallback,
    query: { page },
  } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} paddingSides={0}>
      <Head
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
    key: RKEY_POSTS,
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
    )
    .catch((err) => {
      captureException(err, "FETCH_ARTICLES");
      return null;
    });

  if (!posts) {
    return {
      notFound: true,
    };
  }

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
    )
    .catch((err) => {
      captureException(err, "FETCH_POSTER");
      return null;
    });

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
