import { clientRedis } from "../../../../lib/redis";

export const pullIDs = (nodeList) => nodeList.map((node) => node.id);

export const setFeed = async (key, postsIDs) => {
  try {
    clientRedis.set(`${key}_IDs`, JSON.stringify(postsIDs));
  } catch (error) {
    throw new Error(error);
  }
};

export const getFeed = async (key, id) => {
  const nextPostID = await clientRedis
    .get(`${key}_IDs`)
    .then((response) => JSON.parse(response))
    .then(
      (postsIDs) =>
        postsIDs[postsIDs.findIndex((post) => post === id) + 1] || null,
    )
    .catch((error) => {
      throw new Error(error);
    });

  return nextPostID;
};
