import { exceptionLog } from "@/helpers";

import { getMenu, getWidget } from "../lib";

export type GetSidebarID = "home_sidebar-top" | "home_sidebar-bottom";

type SidebarList = Awaited<ReturnType<typeof getWidget.load>> & {
  title: string;
};

export const getSidebar = async (id: GetSidebarID) => {
  try {
    const sidebar = await getMenu({ id });
    if (sidebar === null) return null;

    const widgetList = await Promise.all(
      sidebar.map((item) => getWidget.load(item.path)),
    );

    return sidebar.reduce<SidebarList[]>((acc, item, index) => {
      let widget = widgetList[index];
      if (widget === null) return acc;

      if (widget.template.sidebar.order === "random") {
        widget = getWidget.orderRandom(widget);
      }

      acc.push({ ...widget, title: item.label });
      return acc;
    }, []);
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
