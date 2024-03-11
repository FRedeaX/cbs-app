import { GetPathsToPosts } from "./types";
import { getPathByMetrika } from "./utils/getPathByMetrika/getPathByMetrika";
import { getPathByWP } from "./utils/getPathByWP/getPathByWP";

export const getPathsToPosts = async (): Promise<GetPathsToPosts> => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return [];
  }

  const wpData = getPathByWP();
  const metrikaData = getPathByMetrika();

  const [wp, metrika] = await Promise.all([wpData, metrikaData]);
  if (wp.length === 0) return metrika;
  if (metrika.length === 0) return wp;

  return wp.reduce<GetPathsToPosts>((acc, w) => {
    if (metrika.findIndex((m) => m.slug === w.slug) > 0) {
      return acc;
    }

    acc.push(w);
    return acc;
  }, metrika);
};
