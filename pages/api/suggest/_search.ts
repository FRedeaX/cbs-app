/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from "next";
import { esClient } from "../../../core/elastic-client";

interface INextApiRequest extends NextApiRequest {
  query: {
    query: string;
  };
}

export default async function _search(
  req: INextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req.query || null;

  if (query !== null) {
    try {
      const body = {
        query: {
          multi_match: {
            query,
            fields: ["title", "content"],
          },
        },
        highlight: {
          pre_tags: ["<mark>"],
          post_tags: ["</mark>"],
          number_of_fragments: 1,
          fragment_size: 200,
          fields: {
            title: {},
            content: {},
          },
        },
      };

      const result = await esClient
        .search({
          index: process.env.ES_INDEX_NAME,
          body,
        })
        .then(
          (response) =>
            // if (response.status !== 200)
            //   throw new Error(`status: ${response.status}`);

            response,
        );

      // const result = await fetch("http://192.168.1.2:9200/cbs/_search", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `ApiKey ${process.env.API_ES_KEY}`,
      //   },
      //   body,
      // }).then((response: Response) => {
      //   if (response.status !== 200)
      //     throw new Error(`status: ${response.status}`);

      //   return response.json();
      // });

      res.status(200).json(result.body);
    } catch (error: any) {
      res.status(error.status || 500).json({ cstMessage: "ERR_SEARCH", error });
    }
  }
  // else res.status(500).end("query not found");
}
