import { Tedis } from "tedis";

// import { errorHelper } from "../../helpers/errorHendler";
let client;

try {
  if (typeof window === "undefined") {
    client = new Tedis({
      host: `${process.env.REDIS_HOST}`,
      // host: `${process.env.REDIS_HOST_DEV}`,
      port: `${process.env.REDIS_PORT}`,
    });
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("@", error);
}
const clientRedis = client;
export default clientRedis;
