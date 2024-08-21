import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostsByCategory, ssrUtils } from "@/core/ssr";
import { HomePost } from "src/widgets/home/Post";

type Props = {
  params: {
    slug: string;
    page: string;
  };
};

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = params;

  const page = ssrUtils.parsePageNumber(params.page);
  const posts = await getPostsByCategory({ slug, page }, true);
  if (posts === null) notFound();

  const name = ssrUtils.findCategoryName(posts.data[0].categories.nodes, slug);

  return {
    title: `Категория: ${name} — cтраница ${page}`,
    description: `Мероприятия библиотек города Байконур по категории ${name}, cтраница ${page}`,
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = params;

  const page = ssrUtils.parsePageNumber(params.page);
  const posts = await getPostsByCategory({ slug, page });
  if (posts === null) notFound();

  const name = ssrUtils.findCategoryName(posts.data[0].categories.nodes, slug);

  return (
    <HomePost
      title={`Категория: ${name}`}
      posts={posts.data}
      pagination={{
        count: posts.pageCount,
        uri: `/post/category/${slug}`,
        page,
      }}
    />
  );
};

export default Page;
