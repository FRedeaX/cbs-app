import { ReactNode } from "react";

import { getPosters, getResources } from "@/core/ssr";
import { HomeLayout as WidgetHomeLayout } from "src/widgets/home/Layout";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const postersData = getPosters.load().then(getPosters.filter);
  const resourcesData = getResources();

  const [posters, resources] = await Promise.all([postersData, resourcesData]);

  return (
    <WidgetHomeLayout posters={posters} resources={resources}>
      {children}
    </WidgetHomeLayout>
  );
};

export default HomeLayout;
