import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RouteQuestionnaire } from "@/routes/Questionnaire";
import Head from "@/components/Head/Head";
import Layout from "@/components/UI/Layout/Layout";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
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
  <Layout menu={menu} paddingSides={15}>
    <Head title="Анкета пользователя Библиотеки Модельного стандарта" />
    <RouteQuestionnaire />
  </Layout>
);

export default QuestionnairePage;
