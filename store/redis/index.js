import { Tedis } from "tedis";

// import { errorHelper } from "../../helpers/errorHendler";

const clientRedis = null;

try {
  typeof window === "undefined" &&
  new Tedis({
    host: `${process.env.REDIS_HOST}`,
    // host: `${process.env.REDIS_HOST_DEV}`,
    port: `${process.env.REDIS_PORT}`,
  });  
} catch (error) {
  console.error(error);
}

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
