import dynamic from "next/dynamic";

export const DynamicRoutePreview = dynamic(
  () => import("./Route.Preview").then((res) => res.RoutePreview),
  {
    ssr: false,
    loading: () => <>Загрузка компонента...</>,
  },
);
