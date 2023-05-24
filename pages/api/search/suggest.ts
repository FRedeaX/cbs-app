import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { suggestQuery } from "@/core/elastic";

export default async function suggest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { text } = req.query;
    if (typeof text !== "string") {
      throw new ApiError(400, "query text cannot be null or undefined");
    }

    const data = await suggestQuery({ text });
    res.status(200).json(data);
  } catch (err) {
    const error = err as ApiError;
    res.status(error.statusCode).end(error.message);
  }
}
