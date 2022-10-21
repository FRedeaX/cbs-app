// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require("@elastic/elasticsearch");

export const esClient = new Client({
  node: [process.env.API_ES_ORIGIN],
  auth: { apiKey: process.env.API_ES_KEY },
});
