import { NextApiRequest, NextApiResponse } from "next";

import { clientMongo } from "@/lib/mongo/client";
import { exceptionLog } from "@/helpers";

const dbName = "questionnaire";

type SearchApiRequest = NextApiRequest;

export default async function search(
  req: SearchApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = JSON.parse(req.body);

    await clientMongo.connect();
    const db = clientMongo.db(dbName);
    const collection = db.collection("documents");

    await collection.insertOne(data);
    res.status(200).end();
  } catch (err) {
    exceptionLog(err);
    res.status(500).end();
  } finally {
    await clientMongo.close();
  }
}
