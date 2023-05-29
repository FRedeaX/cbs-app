import { MongoClient } from "mongodb";

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;

export const clientMongo = new MongoClient(url);
