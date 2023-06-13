import { NextApiRequest, NextApiResponse } from "next";

import { clientMongo } from "@/lib/mongo/client";
import { questionnaire } from "@/core/backend";
import { exceptionLog } from "@/helpers";

const DB_NAME = "questionnaire";
const EXCEPTION_FIELDS = { _id: 0, date: 0 };

type GetApiRequest = NextApiRequest & {
  apikey: string;
  /**
   * Группировка ответов.
   */
  grouping: string;
};

const get = async (req: GetApiRequest, res: NextApiResponse) => {
  try {
    const findResult: Record<string, string[]>[] = [];
    const { apikey, grouping } = req.query;
    if (
      !(typeof apikey === "string" && apikey === process.env.MONGO_PASSWORD)
    ) {
      res.status(403).end();
    }

    await clientMongo.connect();
    const db = clientMongo.db(DB_NAME);
    const collection = db.collection("documents");

    const cursor = collection.find(
      {},
      { projection: grouping ? EXCEPTION_FIELDS : {} },
    );

    if ((await collection.countDocuments({})) === 0) {
      res.status(200).end("Документы не найдены.");
    }

    // eslint-disable-next-line no-restricted-syntax
    for await (const doc of cursor) {
      findResult.push(doc);
    }

    if (grouping !== undefined) {
      const group = questionnaire.groupingOfAnswers(findResult);

      res.status(200).json(group);
      return;
    }

    res.status(200).json(findResult);
  } catch (err) {
    exceptionLog(err);
    res.status(500).end();
  } finally {
    await clientMongo.close();
  }
};

export default get;
