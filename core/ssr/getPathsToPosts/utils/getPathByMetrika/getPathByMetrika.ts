import { YM_ID } from "@/core/metrics/YMetrika/constant";
import { exceptionLog, fetcherData } from "@/helpers";

import { createPath } from "../createPath/createPath";

import { Data } from "./types";

const url = "https://api-metrika.yandex.net/stat/v1/data";
const params = {
  dimensions: "ym:pv:URL",
  metrics: "ym:pv:pageviews",
  filters: `
    ym:pv:URLPath =@ 'post/' AND
    ym:pv:URLPath !@ 'page/' AND
    ym:pv:URLPath !@ 'category/' 
  `,
  limit: "50",
  date1: "90daysAgo",
  date2: "today",
  group: "year",
  accuracy: "0.1",
  id: YM_ID.toString(),
};

export const getPathByMetrika = async () => {
  try {
    const headers = { Authorization: `OAuth ${process.env.API_METRIKA_TOKEN}` };
    const { data } = await fetcherData<Data, typeof params>({
      url,
      headers,
      ...params,
    });

    return data.map((element) =>
      createPath(element.dimensions[0].name.split("/").at(-1) || "/"),
    );
  } catch (error) {
    exceptionLog(error);
    return [];
  }
};
