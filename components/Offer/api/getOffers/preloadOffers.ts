import { getOffers } from "./getOffers";

/** @param id ярлык текущей записи */
export const preloadOffers = (id: string) => {
  void getOffers(id);
};
