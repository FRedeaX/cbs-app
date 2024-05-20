import { getSidebar } from "@/core/ssr";
import { HomeHero } from "src/widgets/home/Hero";

const Page = async () => {
  const sidebar = await getSidebar("home_sidebar-bottom");

  return sidebar?.map(({ id, template, title, uri, children }) => (
    <HomeHero
      key={id}
      template={template.templateName as never}
      title={title}
      uri={uri}
      data={children.nodes}
    />
  ));
};

export default Page;
