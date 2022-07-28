import { Tedis } from "tedis";

let client;

try {
  const port = process.env.REDIS_PORT;

  if (typeof window === "undefined") {
    client = new Tedis({
      host: `${process.env.REDIS_HOST}`,
      port: port ? parseInt(port, 10) : undefined,
    });
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("@", error);
}
const clientRedis = client;
export default clientRedis;
