import { getOffers } from "../api";
import { DynamicOfferTabs } from "../components";

type OfferProps = {
  id: string;
  categories: string[];
};

export const Offer = async ({ id, categories }: OfferProps) => {
  const data = await getOffers(id);

  if (!data || !(data.similarPosts?.length || data.postsByCategory?.length))
    return null;

  return (
    <DynamicOfferTabs
      categories={categories}
      similarPosts={data.similarPosts}
      postsByCategory={data.postsByCategory}
    />
  );
};
