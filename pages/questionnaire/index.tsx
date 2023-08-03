import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RouteQuestionnaire } from "@/routes/Questionnaire";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";

export const questionnaireIsCompleted = true;

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    if (questionnaireIsCompleted) {
      return staticNotFound;
    }

    const menu = await getMenu();

    return {
      props: {
        menu,
      },
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type QuestionnairePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const QuestionnairePage: NextPage<QuestionnairePageProps> = ({ menu }) => (
  <Layout menu={menu}>
    <SEO title="Анкета пользователя Библиотеки Модельного стандарта" />
    <RouteQuestionnaire />
  </Layout>
);

export default QuestionnairePage;
