import dynamic from "next/dynamic";

export const DynamicRoutePreview = dynamic(
  () => import("./Route.Preview").then((res) => res.RoutePreview),
  {
    loading: () => <>Загрузка компонента...</>,
  },
);
