import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu, getMetadata } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RouteQuestionnaire } from "@/routes/Questionnaire";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";

export const questionnaireIsCompleted = true;

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    if (questionnaireIsCompleted) {
      return staticNotFound;
    }

    const menuData = getMenu();
    const metadataData = getMetadata();

    const [menu, metadata] = await Promise.all([menuData, metadataData]);

    return {
      props: { menu, metadata },
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type QuestionnairePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const QuestionnairePage: NextPage<QuestionnairePageProps> = ({
  menu,
  metadata,
}) => (
  <Layout menu={menu}>
    <SEO
      domenTitle={metadata.title}
      title="Анкета пользователя Библиотеки Модельного стандарта"
    />
    <RouteQuestionnaire />
  </Layout>
);

export default QuestionnairePage;
