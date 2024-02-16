import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPosts, ssrUtils } from "@/core/ssr";
import { HomePost } from "src/widgets/home/Post";

type Props = {
  params: {
    page: string;
  };
};

export const generateStaticParams = () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return [];
  }

  return [{ page: "2" }];
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const page = ssrUtils.parsePageNumber(params.page);

  return { title: `Страница ${page}` };
};

const Page = async ({ params }: Props) => {
  // TODO: Посчитать количество вхождений.
  if (params.page.endsWith(".css.map")) notFound();

  const page = ssrUtils.parsePageNumber(params.page);
  const posts = await getPosts({ page });

  if (posts === null) {
    notFound();
  }

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
