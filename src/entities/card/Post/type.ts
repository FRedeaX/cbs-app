import { Nullable } from "@/helpers/typings/utility-types";
import { CategoryProps } from "@/components/Posts/Category/Category";

export type PostCardItem = {
  title: string;
  excerpt: string;
  uri: string;
  featuredImage: Nullable<{
    node: {
      sourceUrl: string;
      blurDataURL?: string;
    };
  }>;
  categories?: {
    nodes: CategoryProps["data"];
  };
};
