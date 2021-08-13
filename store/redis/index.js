import { Tedis } from "tedis";
// import { errorHelper } from "../../helpers/errorHendler";

export const clientRedis =
  typeof window === "undefined" &&
  new Tedis({
    host: `${process.env.REDIS_HOST}`,
    port: `${process.env.REDIS_PORT}`,
  });

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
