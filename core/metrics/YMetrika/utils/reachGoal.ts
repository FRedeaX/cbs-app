import { YM_ID } from "../constant";

export const reachGoal = (id: string) => {
  const { ym } = window;
  if (ym !== undefined) {
    ym(YM_ID, "reachGoal", id);
  }
};
