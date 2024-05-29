import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostsByCategory, ssrUtils } from "@/core/ssr";
import { HomePost } from "src/widgets/home/Post";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return [];
  }

  return [
    { slug: "meropriyatie" },
    { slug: "vyistavka" },
    { slug: "novosti" },
    { slug: "tsgb" },
    { slug: "tsgdb" },
    { slug: "filial-1" },
    { slug: "filial-5" },
    { slug: "ooefkitl" },
    { slug: "ibo" },
  ];
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = params;

  const posts = await getPostsByCategory({ slug });
  if (posts === null) notFound();

  const name = ssrUtils.findCategoryName(posts.data[0].categories.nodes, slug);

  return {
    title: `Категория: ${name}`,
    description: `Мероприятия библиотек города Байконур по категории ${name}`,
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = params;

  const posts = await getPostsByCategory({ slug });
  // TODO: Выполнить поиск и предложить варианты (redirect)
  if (posts === null) notFound();

  const name = ssrUtils.findCategoryName(posts.data[0].categories.nodes, slug);

  return (
    <HomePost
      title={`Категория: ${name}`}
      posts={posts.data}
      pagination={{
        count: posts.pageCount,
        uri: `/post/category/${slug}`,
      }}
    />
  );
};

export default Page;
