import { notFound } from "next/navigation";

import { getPosts } from "@/core/ssr";
import { HomePost } from "src/widgets/home/Post";

const Page = async () => {
  const posts = await getPosts();
  if (posts === null) notFound();

  return (
    <HomePost
      title="Мероприятия"
      posts={posts.data}
      pagination={{
        count: posts.pageCount,
        firstPageLink: "/",
        uri: "/post",
      }}
    />
  );
};

export default Page;
