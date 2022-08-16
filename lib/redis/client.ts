import { createClient } from "@redis/client";

import { exceptionLog } from "../../helpers";

export const clientRedis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

clientRedis.on("error", (err) => {
  exceptionLog(err);
});

clientRedis.connect();
