import { getPosters, getSidebar } from "@/core/ssr";
import { HomeHero } from "src/widgets/home/Hero";
import { HomePoster } from "src/widgets/home/Poster";

const Page = async () => {
  const postersData = getPosters.load().then(getPosters.filter);
  const sidebarData = getSidebar("home_sidebar-top");

  const [posters, sidebar] = await Promise.all([postersData, sidebarData]);

  return (
    <>
      {posters?.length ? <HomePoster posters={posters} /> : null}
      {sidebar?.map(({ id, template, title, uri, children }) => (
        <HomeHero
          key={id}
          template={template.templateName as never}
          title={title}
          uri={uri}
          data={children.nodes}
        />
      ))}
    </>
  );
};

export default Page;
