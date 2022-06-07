/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/prefer-default-export */
const { Client } = require("@elastic/elasticsearch");

export const esClient = new Client({
  node: [process.env.API_ES_ORIGIN],
  auth: { apiKey: process.env.API_ES_KEY },
});
