import { Nullable } from "@/helpers/typings/utility-types";

export type HeroCardItem = {
  title: string;
  uri: string;
  featuredImage: Nullable<{
    node: {
      sourceUrl: string;
      blurDataURL?: string;
    };
  }>;
};
