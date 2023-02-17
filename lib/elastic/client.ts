import type { Client as ClienTypes } from "@elastic/elasticsearch/api/new";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require("@elastic/elasticsearch");

export const esClient: ClienTypes = new Client({
  node: [process.env.API_ES_HOST],
  auth: { apiKey: process.env.API_ES_KEY },
});
