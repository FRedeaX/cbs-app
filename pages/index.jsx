import HomePage from "~/components/Pages/HomePage/HomePage";
import { FETCH_POSTER } from "~/components/poster/PosterRoot/PosterRoot";
import {
  FETCH_ARTICLES,
  POSTS_PAGINATION_GQL,
} from "~/components/Posts/PostsRoot";
import { SEO } from "~/components/SEO/SEO";
import {
  paginationLoad,
  removeDuplicateTag,
  getMenu,
  plaiceholder,
} from "~/helpers/backend";
import { dateConversion, sort, filter } from "~/helpers/backend/poster";
import { client } from "~/store/apollo-client";
import Layout from "~/components/UI/Layout/Layout";

const Home = ({ menu, posters, posts, pages }) => {
  return (
    <Layout menu={menu} paddingSides={0}>
      <SEO description="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур" />
      <HomePage
        posters={posters}
        posts={posts}
        pages={pages}
        paginationURI={"/post"}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const menu = await getMenu(false);
  const dataPosts = await client
    .query({
      query: FETCH_ARTICLES,
      variables: {
        first: 10,
        cursor: "",
      },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => data);

  const posts = await removeDuplicateTag(dataPosts?.posts.nodes).then((nodes) =>
    plaiceholder(nodes.result).then((p) => p)
  );

  const pages = await paginationLoad({
    key: "posts",
    query: POSTS_PAGINATION_GQL,
    endCursor: dataPosts?.posts.pageInfo.endCursor,
  }).then((pagesInfo) => pagesInfo[pagesInfo.length - 1].number - 1);

  const posters = await client
    .query({
      query: FETCH_POSTER,
      fetchPolicy: "network-only",
    })
    .then(({ data }) =>
      dateConversion(data.posters.nodes).then((posters) =>
        sort(posters).then((posters) =>
          filter(posters).then((posters) => posters)
        )
      )
    );

  return {
    props: {
      menu,
      posters,
      posts,
      pages,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Home;
