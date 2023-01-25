import { FETCH_ARTICLES } from "../../../components/Posts/PostsRoot";
import { exceptionLog } from "../../../helpers";
import { plaiceholder } from "../../../helpers/backend";
import { client } from "../../../lib/apollo/client";
import { GET_MINIMUM_DATA_FOR_OFFER } from "../../../routes/Post/Post";

export default async function offers(req, res) {
  const { id } = req.query || null;

  if (id !== null) {
    try {
      // const nextPost = await getFeed(RKEY_POSTS, id)
      //   .then((nextID) =>
      //     client
      //       .query({
      //         query: GET_POST_CONTENT_BY_BLOCKS,
      //         variables: {
      //           id: nextID,
      //           type: "ID",
      //         },
      //         fetchPolicy: "network-only",
      //       })
      //       .then(({ data }) => transformBlocks(data.post))
      //       .catch((error) => {
      //         exceptionLog(error);
      //         return null;
      //       }),
      //   )
      //   .catch((error) => {
      //     exceptionLog(error);
      //     return null;
      //   });

      // eslint-disable-next-line no-unused-vars
      const { notIn, keywords, categoryIn, tagIn, dateQuery } = await client
        .query({
          query: GET_MINIMUM_DATA_FOR_OFFER,
          variables: {
            id,
          },
        })
        .then(({ data: { post }, error }) => {
          if (error !== undefined) throw new Error(error.message);
          if (post === null) return [];
          // throw new Error("data.post of null");

          const date = new Date(post.date);
          return {
            notIn: post.postId,
            keywords: post.postsFields.keywords,
            categoryIn: post.categories.nodes.map(
              (value) => value.termTaxonomyId,
            ),
            tagIn: "",
            dateQuery: {
              before: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
              },
            },
          };
        })
        .catch((error) => {
          exceptionLog(error);
          return {
            notIn: null,
            keywords: "",
            categoryIn: [],
            tagIn: "",
            dateQuery: {},
          };
        });

      if (
        notIn === null &&
        keywords === "" &&
        categoryIn.length === 0 &&
        tagIn === ""
      ) {
        res.status(500).json({ message: "minimum data for offer is null" });
      }

      const postListByCategory = await client
        .query({
          query: FETCH_ARTICLES,
          variables: {
            notIn,
            categoryIn,
            dateQuery,
          },
        })
        .then(({ data, error }) => {
          if (error !== undefined) throw new Error(error.message);
          if (data.posts.nodes.length === 0) return [];
          // throw new Error("data.posts.nodes of null");

          return plaiceholder(data.posts.nodes);
        })
        .catch((error) => {
          exceptionLog(error);
          return [];
        });

      let similarPostList = null;

      if (keywords) {
        similarPostList = await client
          .query({
            query: FETCH_ARTICLES,
            variables: {
              notIn,
              search: keywords,
            },
          })
          .then(({ data, error }) => {
            if (error !== undefined) throw new Error(error.message);
            if (data.posts.nodes.length === 0) return [];
            // throw new Error("data.posts.nodes of null");

            return plaiceholder(data.posts.nodes);
          })
          .catch((error) => {
            exceptionLog(error);
            return [];
          });
      }

      res.status(200).json({
        data: JSON.stringify({
          nextPost: null,
          postListByCategory,
          similarPostList,
        }),
      });
    } catch (error) {
      exceptionLog(error);
      res.status(500).json({ message: "ERR_ID", error });
    }
  } else res.status(500).end("query not found");
}
