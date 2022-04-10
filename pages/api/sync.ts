import { gql } from "@apollo/client";
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

    const es = await fetch(
      "http://elastic:es-2575-s4128@192.168.1.2:9200/cbs/_bulk",
      {
        method: "POST",
        body: JSON.stringify(esBulkBody),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response: Response) => response.json())
      .catch((error: Error) => console.error(error));

    console.log(esBulkBody);

    res.status(200).json({
      data: JSON.stringify(esBulkBody),
    });
  } catch (error) {
    res.status(500).json({ message: "ERR_SYNC", error });
  }
}
