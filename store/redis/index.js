import { Tedis } from "tedis";

// import { errorHelper } from "../../helpers/errorHendler";

const clientRedis =
  typeof window === "undefined" &&
  new Tedis({
    host: `${process.env.REDIS_HOST}`,
    port: `${process.env.REDIS_PORT}`,
  });

export default clientRedis;
// (async () => {
//   await clientRedis
//     .get("post")
//     .then(() => console.log("Redis started"))
//     .catch((e) => console.error("Redis error", e));
// })();
// export let clientRedis;

// errorHelper(() => {
//   clientRedis =
//     typeof window === "undefined" &&
//     new Tedis({
//       host: `${process.env.REDIS_HOST}`,
//       port: `${process.env.REDIS_PORT}`,
//     });
// });

// console.log(clientRedis);
