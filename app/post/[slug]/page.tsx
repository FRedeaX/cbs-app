import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPathsToPosts, getPost } from "@/core/ssr";
import { RoutePost } from "@/routes/Post/Route.Post";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = getPathsToPosts;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = params;

  const post = await getPost({ slug }, true);

  if (post === null) {
    notFound();
  }

  const {
    title,
    excerpt: description,
    link: url,
    featuredImage,
    videos,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      ...(featuredImage && {
        images: [{ url: featuredImage.node.sourceUrl }],
      }),
      videos,
    },
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = params;

  const post = await getPost({ slug });

  if (post === null) {
    notFound();
  }

  return (
    <RoutePost
      id={post.id}
      href={post.link}
      title={post.title}
      blocks={post.blocks}
      categories={post.categories.nodes}
      imageUrl={post.featuredImage?.node.sourceUrl}
    />
  );
};

export default Page;
