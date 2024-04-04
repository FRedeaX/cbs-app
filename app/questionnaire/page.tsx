import { Metadata } from "next";
import { notFound } from "next/navigation";

import { RouteQuestionnaire } from "@/routes/Questionnaire";

import { questionnaireIsCompleted } from "./constant";

export const metadata: Metadata = {
  title: "Анкета пользователя Библиотеки Модельного стандарта",
};

const Page = async () => {
  if (questionnaireIsCompleted) {
    notFound();
  }

  return <RouteQuestionnaire />;
};

export default Page;
