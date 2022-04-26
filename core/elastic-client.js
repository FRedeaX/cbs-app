const { Client } = require('@elastic/elasticsearch')

export const esClient = new Client({
  host: [process.env.API_ES_URL],
  auth: { apiKey: process.env.API_ES_KEY }
})