import { Metadata } from "next";
import { headers } from "next/headers";

import { searchQuery } from "@/core/elastic/search/searchQuery";
import { SearchParams } from "@/core/elastic/type";
import { getUAPlatform } from "@/helpers/backend";
import { UA } from "@/helpers/backend/getUA/const";
import { RouteSearch } from "@/routes/Search";

type Props = { searchParams: SearchParams };

export const metadata: Metadata = {
  title: "Поиск",
};

const Page = async ({ searchParams }: Props) => {
  const headersList = headers();
  const platform = getUAPlatform(headersList, UA.touch);

  const ssrData = await searchQuery(searchParams);

  return <RouteSearch ssrData={ssrData} platform={platform} />;
};

export default Page;
