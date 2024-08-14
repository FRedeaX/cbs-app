import { Nullable } from "@/helpers/typings/utility-types";

import { offerAdapter } from "../adapter";

type ConvertData = Nullable<ReturnType<typeof offerAdapter>>;
export type ResponseOfferData = {
  similarPosts: ConvertData;
  postsByCategory: ConvertData;
};
