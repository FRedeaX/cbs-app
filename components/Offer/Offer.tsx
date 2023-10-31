import { FC } from "react";
import useSWR, { SWRConfiguration } from "swr";

import { ResponseOfferData } from "@/core/api/offers/types";
import { FetcherData, fetcherData } from "@/helpers";

import { OfferTabs } from "./components/Tabs/Offer.Tabs";
import { handleOnSuccess } from "./utils/goal";

const config: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  errorRetryCount: 1,
  onSuccess: handleOnSuccess,
};

type OfferProps = {
  id: string;
  categories: string[];
};

type SWRKey = FetcherData & Pick<OfferProps, "id">;

export const Offer: FC<OfferProps> = ({ id, categories }) => {
  const { data } = useSWR<ResponseOfferData, unknown, SWRKey>(
    { url: `/api/post/offer`, id },
    fetcherData,
    config,
  );

  if (!data || !(data.similarPosts?.length || data.postsByCategory?.length))
    return null;

  return (
    <OfferTabs
      categories={categories}
      similarPosts={data.similarPosts}
      postsByCategory={data.postsByCategory}
    />
  );
};
