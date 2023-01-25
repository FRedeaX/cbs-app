import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { searchQuery } from "../../../core/elastic";
import { SearchParams } from "../../../core/elastic/type";

type SearchApiRequest = NextApiRequest & {
  query: SearchParams;
};

export default async function search(
  req: SearchApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await searchQuery(req.query);
    res.status(200).json(data);
  } catch (err) {
    const error = err as ApiError;
    res.status(error.statusCode).end(error.message);
  }
}
