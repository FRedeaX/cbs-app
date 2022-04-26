import { gql } from "@apollo/client";
import { esClient } from "../../core/elastic-client";
import { client } from "../../store/apollo-client";

const GET_POSTS = gql`
  query GET_POSTS {
    posts {
      nodes {
        id
        link
        title
        excerpt
        content
      }
    }
  }
`;

interface IPost {
  id: string;
  link: string;
  title: string;
  excerpt: string;
  content: string;
}

export default async function offers(req, res) {
  // const { id } = req.query || null;
  // if (id === null) res.status(500).end("query not found");

  try {
    const postList = await client
      .query({
        query: GET_POSTS,
      })
      .then(({ data }) => data.posts.nodes)
      .catch((err) => {
        console.log(err, "GET_POSTS");
        return null;
      });

    const esBulkBody: any = [];

    postList.forEach((post: IPost) => {
      esBulkBody.push({ index: { _id: post.id } });
      esBulkBody.push({
        link: post.link,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
      });
    });

    // elastic:es-2575-s4128@192.168.1.2:9200

    // const es = await fetch(
    //   "http://elastic:es-2575-s4128@192.168.1.2:9200/cbs/_bulk",
    //   {
    //     method: "POST",
    //     body: [
    //       { index: { _id: "cG9zdDoyNzg0Mg==" } },
    //       { link: "https://cbsbaikonur.ru/post/ne-shuti-s-ognyom/", title: "«Не шути с огнём»" },
    //       { index: { _id: "cG9zdDoyNzgyOA==" } },
    //       { link: "https://cbsbaikonur.ru/post/marshaly-pobedy-2/", title: "«Маршалы Победы»" }
    //     ],
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // )
    //   .then((response: Response) => response.json())
    //   .catch((error: Error) => console.error(error));

    // console.log(es);

    const es = esClient.ping(
      {
        requestTimeout: 30000,
      },
      function (error) {
        if (error) {
          console.error("elasticsearch cluster is down!");
        } else {
          console.log("Everything is ok");
        }
      },
    );

    res.status(200).json({
      data: JSON.stringify(es),
    });
  } catch (error) {
    res.status(500).json({ message: "ERR_SYNC", error });
  }
}
