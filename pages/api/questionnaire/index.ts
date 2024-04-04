import { NextApiRequest, NextApiResponse } from "next";

import { clientMongo } from "@/lib/mongo/client";
import { exceptionLog } from "@/helpers";
import { questionnaireIsCompleted } from "app/questionnaire/constant";

const dbName = "questionnaire";

const set = async (req: NextApiRequest, res: NextApiResponse) => {
  if (questionnaireIsCompleted) {
    res.status(410).end();
    return;
  }
  try {
    const data = JSON.parse(req.body);
    const date = new Date().getTime();

    await clientMongo.connect();
    const db = clientMongo.db(dbName);
    const collection = db.collection("documents");

    await collection.insertOne({ date, ...data });
    res.status(200).end();
  } catch (err) {
    exceptionLog(err);
    res.status(500).end();
  } finally {
    await clientMongo.close();
  }
};

export default set;
