import { ERROR_MESSAGE } from "@/constants";

import { clientGetBibliotekiQuery } from "./gql/getBibliotekiGQL";
import { transformFields } from "./utils/transformFields";

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const getBiblioteki = async (metadata = false) => {
  const { data, error, errors } = await clientGetBibliotekiQuery();

  if (error !== undefined) throw error;
  if (data === undefined) throw errors;
  if (data.page === null) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

  const { title, excerpt: description, children } = data.page;
  if (metadata) return { title, description };

  const filialList = children.nodes
    .map((filial) => transformFields(filial))
    .sort((a, b) => a.order - b.order);

  return { title, description, filialList };
};
