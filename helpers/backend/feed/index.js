import clientRedis from "../../../store/redis";

export const pullIDs = (nodeList) => nodeList.map((node) => node.id);

export const setFeed = async (key, postsIDs) => {
  clientRedis.set(`${key}_IDs`, JSON.stringify(postsIDs));
};

export const getFeed = async (key, id) => {
  const nextPostID = await clientRedis
    .get(`${key}_IDs`)
    .then((response) => JSON.parse(response))
    .then(
      (postsIDs) =>
        postsIDs[postsIDs.findIndex((post) => post === id) + 1] || null,
    )
    .catch(() => null);

  return nextPostID;
};
