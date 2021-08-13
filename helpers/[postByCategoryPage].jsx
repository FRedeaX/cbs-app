// // import HomePage from "~/components/Pages/HomePage/HomePage";
// import { useRouter } from "next/router";
// import HomePage from "~/components/Pages/HomePage/HomePage";
// import {
//   fetchArticlesByCategory,
//   POSTS_PAGINATION_BY_CATEGORY_GQL,
// } from "~/components/Posts/PostsRoot";
// import { SEO } from "~/components/SEO/SEO";
// import { paginationLoad } from "~/helpers/backend";
// import { client } from "~/store/apollo-client";

// const Home = ({ posts, pages }) => {
//   const router = useRouter();
//   if (router.isFallback) {
//     return <div>Загрузка...</div>;
//   }
//   return (
//     <>
//       <SEO
//         title={`Страница ${router.query.postByCategoryPage}`}
//         description={`Мероприятия библиотек города Байконур страница №${router.query.postByCategoryPage}`}
//       />
//       <HomePage posts={posts} pages={pages} isGroupCards={false} />
//     </>
//   );
// };

// // export async function getStaticPaths() {
// //   return {
// //     paths: [{ params: { homePage: "" } }],
// //     fallback: true,
// //   };
// // }

// // export async function getStaticProps() {
// //   const { data } = await client.query({
// //     query: FETCH_ARTICLES,
// //     // variables: {
// //     //   first: 10,
// //     // },
// //     fetchPolicy: "network-only",
// //   });

// //   // data.posts.nodes.map((post) => {
// //   //   const { title, tags } = post;
// //   //   console.log({
// //   //     title: title,
// //   //     count: tags.nodes[0]?.count,
// //   //     slug: tags.nodes[0]?.slug,
// //   //   });
// //   // });

// //   return {
// //     props: {
// //       posts: data.posts.nodes,
// //     },
// //     revalidate: 1800,
// //   };
// // }

// // export async function getStaticPaths() {
// //   return {
// //     paths: [
// //       {
// //         params: {
// //           postByCategoryPage: "tsgb",
// //         },
// //       },
// //     ],
// //     fallback: true,
// //   };
// // }

// //getServerSideProps
// //getStaticProps
// export async function getServerSideProps({
//   query: { postByCategoryPage, page },
// }) {
//   const pages = await paginationLoad(
//     `category${postByCategoryPage}`,
//     POSTS_PAGINATION_BY_CATEGORY_GQL
//   );
//   console.log(page);

//   const { cursor } = pages[page - 1 || 0];

//   const { data } = await client.query({
//     query: fetchArticlesByCategory,
//     variables: {
//       id: postByCategoryPage,
//       first: cursor === "" ? 10 : 20,
//       cursor,
//     },
//     fetchPolicy: "network-only",
//   });
//   // const posts = await removeDuplicateTag(data.posts.nodes);

//   // const { data: _posters } = await client.query({
//   //   query: FETCH_POSTER,
//   // });

//   return {
//     props: {
//       pages,
//       posts: data.category.posts.nodes,
//     },
//   };
// }

// export default Home;
