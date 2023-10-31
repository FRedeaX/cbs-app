import { getPlaceholder } from "@/core/placeholder";
import { splitDepartmentAndCategories } from "@/helpers/backend";
import { Nullable } from "@/helpers/typings/utility-types";

type Props = {
  featuredImage: Nullable<{
    node: { databaseId: number; sourceUrl: string };
  }>;
  categories: {
    nodes: {
      name: string;
    }[];
  };
};

type Result = {
  featuredImage: Nullable<{
    node: Partial<Awaited<ReturnType<typeof getPlaceholder>>>;
  }>;
};

/**
 * Добавляет:
 * - плейсхолдер
 * - сортирует категории
 */
export const addsFeaturesToPost = async <T>(post: T & Props) => {
  const { featuredImage }: Result & Props = post;

  if (featuredImage) {
    const { databaseId, sourceUrl } = featuredImage.node;
    const { blurDataURL } = await getPlaceholder({
      id: databaseId,
      url: sourceUrl,
    });
    featuredImage.node.blurDataURL = blurDataURL;
  }

  const { categories: splitC, departments: splitD } =
    splitDepartmentAndCategories(post.categories.nodes);
  const categories = {
    nodes: splitD.nodes.concat(splitC.nodes),
  };

  return {
    ...post,
    categories,
    featuredImage,
  };
};
