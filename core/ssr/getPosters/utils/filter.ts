import { Nullable } from "@/helpers/typings/utility-types";

import { Poster } from "../type";

import { isPush } from "./isPush";

export const filter = (posterList: Nullable<Poster[]>) => {
  if (!posterList) return null;

  const date = new Date();
  const currentDate = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hours: date.getHours(),
  };

  return posterList.filter((poster) => isPush(poster, currentDate));
};
