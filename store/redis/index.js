import { createClient } from "@redis/client";

const clientRedis = createClient();

clientRedis.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.log("Redis Client Error", err);
});

export default clientRedis;
