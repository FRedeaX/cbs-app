import { captureException } from "@sentry/nextjs";
import { FETCH_ARTICLES } from "../../../components/Posts/PostsRoot";
import { plaiceholder } from "../../../helpers/backend";
import { GET_MINIMUM_DATA_FOR_OFFER } from "../../../routers/Post/Post";
import { client } from "../../../store/apollo-client";

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
      //       .catch((err) => {
      //         captureException(err, "GET_POST_CONTENT_BY_BLOCKS");
      //         return null;
      //       }),
      //   )
      //   .catch((err) => {
      //     captureException(err, "getFeed");
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
          if (post === null) throw new Error("data.post of null");

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
        .catch((err) => {
          captureException({
            ...err,
            cstMessage: "API_OFFERS_GET_MINIMUM_DATA_FOR_OFFER",
          });
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
          if (data.posts.nodes.length === 0)
            throw new Error("data.posts.nodes of null");

          return plaiceholder(data.posts.nodes);
        })
        .catch((err) => {
          captureException({ ...err, cstMessage: "API_OFFERS_FETCH_ARTICLES" });
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
            if (data.posts.nodes.length === 0)
              throw new Error("data.posts.nodes of null");

            return plaiceholder(data.posts.nodes);
          })
          .catch((err) => {
            captureException({
              ...err,
              cstMessage: "API_OFFERS_FETCH_ARTICLES",
            });
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
      captureException({ ...error, cstMessage: "ERR_IDs" });
      res.status(500).json({ message: "ERR_ID", error });
    }
  } else res.status(500).end("query not found");
}
