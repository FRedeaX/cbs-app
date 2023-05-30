import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/?retryWrites=true&w=majority`;

export const clientMongo = new MongoClient(url);
