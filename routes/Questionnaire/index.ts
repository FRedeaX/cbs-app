import dynamic from "next/dynamic";

export const RouteQuestionnaire = dynamic(
  () => import("./Route.Questionnaire").then((res) => res.RouteQuestionnaire),
  {
    ssr: true,
  },
);
