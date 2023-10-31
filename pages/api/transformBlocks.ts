import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { transformBlocks } from "@/core/backend/transformBlocks";
import { exceptionLog } from "@/helpers";

export type ResponseTransformBlocksData = Awaited<
  ReturnType<typeof transformBlocks>
>;

export default async function transformBlocksHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseTransformBlocksData>,
) {
  try {
    const body = JSON.parse(req.body);
    if (!body) {
      throw new ApiError(400, `"body" не определен`);
    }

    const data = await transformBlocks(body);
    res.status(200).json(data);
  } catch (error) {
    exceptionLog(error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).end(error.message);
    } else {
      res.status(500).end("Ошибка обработки блоков");
    }
  }
}
