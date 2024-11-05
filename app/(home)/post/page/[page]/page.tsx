import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPosts, ssrUtils } from "@/core/ssr";
import { HomePost } from "src/widgets/home/Post";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const page = ssrUtils.parsePageNumber(params.page);

  return { title: `Страница ${page}` };
};

const Page = async (props: Props) => {
  const params = await props.params;
  // TODO: Посчитать количество вхождений.
  if (params.page.endsWith(".css.map")) notFound();

  const page = ssrUtils.parsePageNumber(params.page);
  const posts = await getPosts({ page });
  if (posts === null) notFound();

  return (
    <HomePost
      title="Мероприятия"
      posts={posts.data}
      pagination={{
        count: posts.pageCount,
        firstPageLink: "/",
        uri: "/post",
        page,
      }}
    />
  );
};

export default Page;
