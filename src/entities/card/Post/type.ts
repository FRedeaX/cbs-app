import { Nullable } from "@/helpers/typings/utility-types";
import { CategoryItemProps } from "src/shared/ui/category";

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
    nodes: CategoryItemProps[];
  };
};
