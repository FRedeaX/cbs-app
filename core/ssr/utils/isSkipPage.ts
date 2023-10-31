const skipTemplate = ["Library", "Redirect"];

type Props = {
  template: {
    templateName: string;
  };
};

/**
 * Пропускаем страницу если название шаблона
 * совпадает с вариантом из `skipTemplate`.
 */
export const isSkipPage = (page: Props) =>
  skipTemplate.includes(page.template.templateName);
