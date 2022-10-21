/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from "next";

import { esClient } from "../../../core/elastic-client";
import { createBodyRequest } from "../../../lib/elastic";

interface INextApiRequest extends NextApiRequest {
  query: {
    text: string;
  };
}

export default async function _search(
  req: INextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.query);

  const body = createBodyRequest(req.query);

  try {
    const result = await esClient.search({
      index: process.env.ES_INDEX_NAME,
      body,
    });

    res.status(result.statusCode || 200).json(result.body);
  } catch (error: any) {
    res.status(error.status || 500).json({ cstMessage: "ERR_SEARCH", error });
  }
  // else res.status(500).end("query not found");
}
