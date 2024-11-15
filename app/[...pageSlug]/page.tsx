import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPage, getPath } from "@/core/ssr";
import { RoutePage } from "@/routes/Page/Route.Page";

type Props = {
  params: Promise<{
    pageSlug: string[];
  }>;
};

export const generateStaticParams = getPath;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { pageSlug } = await params;

  const page = await getPage(pageSlug, true);

  if (page === null) {
    notFound();
  }

  const {
    children,
    pageNumber,
    data: {
      title: pageTitle,
      excerpt: description,
      link: url,
      featuredImage,
      videos,
    },
  } = page;

  const title = pageNumber
    ? `${pageTitle} — Cтраница ${pageNumber}`
    : pageTitle;
  const type = children ? "website" : "article";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      ...(featuredImage && {
        images: [{ url: featuredImage.node.sourceUrl }],
      }),
      videos,
    },
  };
};

const Page = async ({ params }: Props) => {
  const { pageSlug } = await params;

  const page = await getPage(pageSlug);

  if (page === null) {
    return notFound();
  }

  return (
    <RoutePage
      page={{
        title: page.data.title,
        href: page.data.link,
        blocks: page.data.blocks,
        imageUrl: page.data.featuredImage?.node.sourceUrl,
      }}
      childrenPage={page.children}
      pagination={page.pagination}
      pageNumber={page.pageNumber ?? undefined}
    />
  );
};

export default Page;
