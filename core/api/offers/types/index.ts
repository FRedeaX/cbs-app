import { Nullable } from "@/helpers/typings/utility-types";

import { convertData } from "../utils";

type ConvertData = Nullable<ReturnType<typeof convertData>>;
export type ResponseOfferData = {
  similarPosts: ConvertData;
  postsByCategory: ConvertData;
};
