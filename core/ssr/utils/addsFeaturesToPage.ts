import { getPlaceholder } from "@/core/placeholder";
import { Nullable } from "@/helpers/typings/utility-types";

type Props = {
  featuredImage: Nullable<{
    node: { databaseId: number; sourceUrl: string };
  }>;
};

type BlurDataURL = {
  featuredImage: Nullable<{
    node: Partial<Awaited<ReturnType<typeof getPlaceholder>>>;
  }>;
};

/**
 * Добавляет:
 * - плейсхолдер
 */
export const addsFeaturesToPage = async <T>(page: T & Props) => {
  const { featuredImage }: BlurDataURL & Props = page;

  if (featuredImage) {
    const { databaseId, sourceUrl } = featuredImage.node;
    const { blurDataURL } = await getPlaceholder({
      id: databaseId,
      url: sourceUrl,
    });
    featuredImage.node.blurDataURL = blurDataURL;
  }
  return {
    ...page,
    featuredImage,
  };
};
