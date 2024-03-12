import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPosters } from "@/core/ssr";
import { RoutePoster } from "@/routes/Poster/Route.Poster";

export const metadata: Metadata = {
  title: "Анонсы",
  description: "Анонс мероприятий библиотек города Байконур",
};

const Page = async () => {
  const posters = await getPosters.load();

  if (posters === null) {
    notFound();
  }

  return <RoutePoster posters={posters} />;
};

export default Page;
