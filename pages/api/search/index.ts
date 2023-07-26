import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { searchQuery } from "@/core/elastic";
import { SearchParams } from "@/core/elastic/type";
import { exceptionLog } from "@/helpers";

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
  } catch (error) {
    exceptionLog(error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).end(error.message);
    } else {
      res.status(500).end();
    }
  }
}
