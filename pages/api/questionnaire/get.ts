import { NextApiRequest, NextApiResponse } from "next";

import { clientMongo } from "@/lib/mongo/client";
import { exceptionLog } from "@/helpers";

const dbName = "questionnaire";

type GetApiRequest = NextApiRequest & {
  apikey: string;
};

const get = async (req: GetApiRequest, res: NextApiResponse) => {
  try {
    const { apikey } = req.query;
    if (
      !(typeof apikey === "string" && apikey === process.env.MONGO_PASSWORD)
    ) {
      res.status(403).end();
    }

    await clientMongo.connect();
    const db = clientMongo.db(dbName);
    const collection = db.collection("documents");

    const findResult = await collection.find({}).toArray();
    res.status(200).json(findResult);
  } catch (err) {
    exceptionLog(err);
    res.status(500).end();
  } finally {
    await clientMongo.close();
  }
};

export default get;
